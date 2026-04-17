-- =========================================================
-- ARMS (Academic Room & Hall Reservation System) Schema
-- Supabase / PostgreSQL DDL Script
-- =========================================================

-- 1. Create Enums
CREATE TYPE user_role AS ENUM ('Admin', 'Branch Manager', 'Employee', 'College Secretary');
CREATE TYPE room_type AS ENUM ('Lecture/Section', 'Multi-purpose');
CREATE TYPE booking_type AS ENUM ('Fixed', 'Exceptional', 'Multi-purpose');
CREATE TYPE booking_status AS ENUM ('Pending', 'Approved', 'Rejected');

-- 2. Core Entities & Attributes

CREATE TABLE users (
    employee_id VARCHAR(50) PRIMARY KEY,       -- Employee_ID as PK
    auth_id UUID UNIQUE,                       -- Links to Supabase built-in auth.users
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,            -- Kept as requested. In prod, Supabase Auth replaces the need for this.
    role user_role NOT NULL DEFAULT 'Employee',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE rooms (
    room_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    room_name VARCHAR(100) NOT NULL,
    type room_type NOT NULL,
    capacity INT NOT NULL,
    location VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE time_slots (
    slot_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slot_name VARCHAR(50) NOT NULL, -- e.g., F1, F2
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE bookings (
    booking_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id VARCHAR(50) NOT NULL REFERENCES users(employee_id) ON DELETE CASCADE,
    room_id UUID NOT NULL REFERENCES rooms(room_id) ON DELETE RESTRICT,
    date DATE NOT NULL,
    slot_id UUID NOT NULL REFERENCES time_slots(slot_id) ON DELETE RESTRICT,
    type booking_type NOT NULL,
    status booking_status NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- Technical Constraint #1: Conflict Prevention
-- We use a Partial Unique Index to ensure no overlapping 
-- accepted/pending bookings exist for the same room and slot.
-- =========================================================
CREATE UNIQUE INDEX prevent_double_booking 
ON bookings (room_id, date, slot_id) 
WHERE status != 'Rejected';

CREATE TABLE approval_workflow (
    workflow_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL UNIQUE REFERENCES bookings(booking_id) ON DELETE CASCADE,
    admin_approved_by VARCHAR(50) REFERENCES users(employee_id),
    admin_approved_at TIMESTAMP WITH TIME ZONE,
    branch_manager_approved_by VARCHAR(50) REFERENCES users(employee_id),
    branch_manager_approved_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE rejection_details (
    rejection_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL UNIQUE REFERENCES bookings(booking_id) ON DELETE CASCADE,
    reason TEXT NOT NULL,
    suggested_date DATE,
    suggested_room_id UUID REFERENCES rooms(room_id),
    rejected_by VARCHAR(50) REFERENCES users(employee_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE e_form_details (
    e_form_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL UNIQUE REFERENCES bookings(booking_id) ON DELETE CASCADE,
    event_purpose TEXT NOT NULL,
    supervisor_name VARCHAR(255) NOT NULL,
    supervisor_job VARCHAR(255) NOT NULL,
    supervisor_mobile VARCHAR(50) NOT NULL,
    mic_count INT DEFAULT 0,
    needs_laptop BOOLEAN DEFAULT FALSE,
    needs_video_conf BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE delegation (
    delegation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    original_user_id VARCHAR(50) NOT NULL REFERENCES users(employee_id) ON DELETE CASCADE,
    delegate_user_id VARCHAR(50) NOT NULL REFERENCES users(employee_id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT valid_date_range CHECK (start_date <= end_date)
);

CREATE TABLE user_overrides (
    override_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id VARCHAR(50) NOT NULL UNIQUE REFERENCES users(employee_id) ON DELETE CASCADE,
    can_view_available_rooms BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =========================================================
-- Technical Constraint #2: Time Constraints Logic
-- Trigger enforcing 48h advance limits for Secretaries 
-- and 24h limits for Employees.
-- =========================================================
CREATE OR REPLACE FUNCTION enforce_booking_time_constraints()
RETURNS TRIGGER AS $$
DECLARE
    req_role user_role;
    hours_diff numeric;
    booking_timestamp timestamp;
    slot_start time;
BEGIN
    -- Only evaluate on creation or if date/slot changes
    IF TG_OP = 'INSERT' OR NEW.date != OLD.date OR NEW.slot_id != OLD.slot_id THEN
        -- Get user role
        SELECT role INTO req_role FROM users WHERE employee_id = NEW.employee_id;
        
        -- Get slot start time
        SELECT start_time INTO slot_start FROM time_slots WHERE slot_id = NEW.slot_id;
        
        -- Calculate difference in hours between NOW and Booked Start Time
        booking_timestamp := NEW.date + slot_start;
        hours_diff := EXTRACT(EPOCH FROM (booking_timestamp - NOW())) / 3600.0;
        
        IF req_role = 'College Secretary' AND hours_diff < 48 THEN
            RAISE EXCEPTION 'Constraint Violation: College Secretary must book at least 48 hours in advance. Attempted advance: % hours.', ROUND(hours_diff, 1);
        ELSIF req_role = 'Employee' AND hours_diff < 24 THEN
            RAISE EXCEPTION 'Constraint Violation: Employee must book at least 24 hours in advance. Attempted advance: % hours.', ROUND(hours_diff, 1);
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_booking_time_constraint
BEFORE INSERT OR UPDATE ON bookings
FOR EACH ROW
EXECUTE FUNCTION enforce_booking_time_constraints();

-- =========================================================
-- 3. Seed Data to get started
-- =========================================================

-- Seed Time Slots
INSERT INTO time_slots (slot_name, start_time, end_time) VALUES
('F1', '08:30:00', '10:00:00'),
('F2', '10:30:00', '12:00:00'),
('F3', '12:30:00', '14:00:00'),
('F4', '14:30:00', '16:00:00'),
('F5', '16:30:00', '18:00:00');

-- Seed Rooms
INSERT INTO rooms (room_name, type, capacity, location) VALUES
('Hall 402', 'Lecture/Section', 60, 'Building A, 4th Floor'),
('Conference Room B', 'Multi-purpose', 30, 'Admin Building, 1st Floor'),
('Lab 1', 'Lecture/Section', 40, 'Building B, Ground Floor'),
('Student Hub / Main Arena', 'Multi-purpose', 250, 'Student Activity Center');

-- Seed Dummy Admin User (Password should be masked in reality)
INSERT INTO users (employee_id, name, password, role) VALUES 
('EMP-9999', 'System Admin', 'AdminPass123!', 'Admin'),
('EMP-1002', 'Ahmed College Sec', 'SecPass123!', 'College Secretary');
