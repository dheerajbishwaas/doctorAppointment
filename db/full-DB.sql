--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appointments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointments (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    appointment_date date NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    booking_completed_at timestamp without time zone,
    status character varying DEFAULT 'booked'::character varying NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    doctor_id character varying NOT NULL,
    user_id character varying NOT NULL
);


ALTER TABLE public.appointments OWNER TO postgres;

--
-- Name: doctor_availabilities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctor_availabilities (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id character varying NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    status character varying DEFAULT 'active'::character varying NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.doctor_availabilities OWNER TO postgres;

--
-- Name: doctor_block_dates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctor_block_dates (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    block_date date,
    recurring_day character varying,
    recurring_date integer,
    recurring_month integer,
    is_emergency_available boolean DEFAULT false NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "blockGroupId" uuid,
    status character varying DEFAULT 'active'::character varying NOT NULL
);


ALTER TABLE public.doctor_block_dates OWNER TO postgres;

--
-- Name: doctor_block_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctor_block_groups (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    block_type character varying NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    user_id character varying NOT NULL,
    status character varying DEFAULT 'active'::character varying NOT NULL
);


ALTER TABLE public.doctor_block_groups OWNER TO postgres;

--
-- Name: doctor_specializations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.doctor_specializations (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    "userId" uuid,
    "specializationId" integer,
    status character varying DEFAULT 'active'::character varying NOT NULL
);


ALTER TABLE public.doctor_specializations OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying,
    status boolean DEFAULT true,
    is_deleted boolean DEFAULT false,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: specializations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.specializations (
    id integer NOT NULL,
    name character varying NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    status character varying DEFAULT 'active'::character varying NOT NULL
);


ALTER TABLE public.specializations OWNER TO postgres;

--
-- Name: specializations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.specializations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.specializations_id_seq OWNER TO postgres;

--
-- Name: specializations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.specializations_id_seq OWNED BY public.specializations.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    role_id integer NOT NULL,
    is_deleted boolean DEFAULT false NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    status character varying DEFAULT 'active'::character varying NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: specializations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specializations ALTER COLUMN id SET DEFAULT nextval('public.specializations_id_seq'::regclass);


--
-- Data for Name: appointments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointments (id, appointment_date, start_time, end_time, booking_completed_at, status, is_deleted, created_at, updated_at, doctor_id, user_id) FROM stdin;
ebc3e79f-98fb-42de-9495-930b2f28a303	2025-08-10	10:00:00	10:30:00	2025-08-03 18:40:54.75	booked	f	2025-08-03 18:40:54.770929	2025-08-03 18:40:54.770929	307fd20e-9fc1-418d-9a5a-28ce7e86269d	307fd20e-9fc1-418d-9a5a-28ce7e86269d
71d8776a-d788-4508-a5c0-5d8c66eb264a	2025-08-10	10:30:00	11:00:00	2025-08-03 18:41:47.225	booked	f	2025-08-03 18:41:47.240348	2025-08-03 18:41:47.240348	307fd20e-9fc1-418d-9a5a-28ce7e86269d	307fd20e-9fc1-418d-9a5a-28ce7e86269d
4cdd184d-f5ab-4487-8ba9-3e16fb572fc3	2025-08-25	10:30:00	11:00:00	2025-08-03 18:53:25.711	booked	f	2025-08-03 18:53:25.713234	2025-08-03 18:53:25.713234	307fd20e-9fc1-418d-9a5a-28ce7e86269d	307fd20e-9fc1-418d-9a5a-28ce7e86269d
9e5a73ac-3f36-48b6-b3cc-15fdc4010d1e	2025-08-25	10:30:00	11:00:00	2025-08-03 19:36:26.694	booked	f	2025-08-03 19:36:26.695418	2025-08-03 19:36:26.695418	f2816157-fe1a-4362-bec4-c172c15a3073	62879668-1ae7-4b9b-bf38-8b80e9ab3bff
07814875-249d-41d5-98b8-75f33e43164e	2025-08-11	10:30:00	11:00:00	2025-08-03 19:37:07.254	booked	f	2025-08-03 19:37:07.256088	2025-08-03 19:37:07.256088	f2816157-fe1a-4362-bec4-c172c15a3073	62879668-1ae7-4b9b-bf38-8b80e9ab3bff
\.


--
-- Data for Name: doctor_availabilities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctor_availabilities (id, user_id, start_time, end_time, status, is_deleted, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: doctor_block_dates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctor_block_dates (id, block_date, recurring_day, recurring_date, recurring_month, is_emergency_available, is_deleted, created_at, updated_at, "blockGroupId", status) FROM stdin;
94e2df8f-4c5b-4e5a-8e85-dcdf6327725b	\N	\N	5	\N	t	f	2025-08-03 18:48:18.990709	2025-08-03 18:48:18.990709	335c07b3-02fa-4b56-8e44-20048cba54a9	active
6b1b600c-979e-46fc-a342-66eff0fe9193	\N	\N	20	\N	t	f	2025-08-03 18:48:18.990709	2025-08-03 18:48:18.990709	335c07b3-02fa-4b56-8e44-20048cba54a9	active
0f0201c4-ca00-41b3-bcf5-0caab6811626	2025-08-10	\N	\N	\N	f	f	2025-08-03 18:51:13.908696	2025-08-03 18:51:13.908696	67d20434-d762-4c9c-a087-db870e08b8aa	active
ac98db07-5265-4330-9daf-efdbe14620c5	2025-08-15	\N	\N	\N	f	f	2025-08-03 18:51:13.908696	2025-08-03 18:51:13.908696	67d20434-d762-4c9c-a087-db870e08b8aa	active
2ce64d04-001a-4cdf-8889-80f0386a3b20	\N	Sunday	\N	\N	f	f	2025-08-03 18:52:32.269128	2025-08-03 18:52:32.269128	4c767f28-200a-44d6-8bdc-e4f4370cc179	active
ebf258d8-90d5-4a8b-baae-5c85ab8669f0	\N	Sunday	\N	\N	f	f	2025-08-03 19:34:37.329022	2025-08-03 19:34:37.329022	ffa38811-c063-4d18-8fb0-2a5144dfc850	active
\.


--
-- Data for Name: doctor_block_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctor_block_groups (id, block_type, is_deleted, created_at, updated_at, user_id, status) FROM stdin;
6bee0247-feaa-48d2-914a-38c295667f50	weekly	f	2025-08-03 17:01:28.743746	2025-08-03 17:01:28.743746	307fd20e-9fc1-418d-9a5a-28ce7e86269d	active
8b832037-1e5a-4ae4-87f2-ceb79679849b	monthly	f	2025-08-03 17:08:19.711549	2025-08-03 17:08:19.711549	307fd20e-9fc1-418d-9a5a-28ce7e86269d	active
335c07b3-02fa-4b56-8e44-20048cba54a9	monthly	f	2025-08-03 18:48:18.990709	2025-08-03 18:48:18.990709	307fd20e-9fc1-418d-9a5a-28ce7e86269d	active
67d20434-d762-4c9c-a087-db870e08b8aa	one-time	f	2025-08-03 18:51:13.908696	2025-08-03 18:51:13.908696	307fd20e-9fc1-418d-9a5a-28ce7e86269d	active
4c767f28-200a-44d6-8bdc-e4f4370cc179	weekly	f	2025-08-03 18:52:32.269128	2025-08-03 18:52:32.269128	307fd20e-9fc1-418d-9a5a-28ce7e86269d	active
ffa38811-c063-4d18-8fb0-2a5144dfc850	weekly	f	2025-08-03 19:34:37.329022	2025-08-03 19:34:37.329022	f2816157-fe1a-4362-bec4-c172c15a3073	active
\.


--
-- Data for Name: doctor_specializations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.doctor_specializations (id, is_deleted, created_at, updated_at, "userId", "specializationId", status) FROM stdin;
4715f5cd-201c-4bcb-b6fb-430dfddc7ee2	f	2025-08-03 13:48:32.828656	2025-08-03 13:48:32.828656	307fd20e-9fc1-418d-9a5a-28ce7e86269d	1	active
eaacfd2a-da48-4e59-95fb-3a2fd7a1aee4	f	2025-08-03 13:48:32.828656	2025-08-03 13:48:32.828656	307fd20e-9fc1-418d-9a5a-28ce7e86269d	6	active
c0019fd8-57e3-47be-8301-6b2b8ab9c51f	f	2025-08-03 19:31:38.766536	2025-08-03 19:31:38.766536	f2816157-fe1a-4362-bec4-c172c15a3073	1	active
69ead494-8ee3-472d-880b-50745cf73bf3	f	2025-08-03 19:31:38.766536	2025-08-03 19:31:38.766536	f2816157-fe1a-4362-bec4-c172c15a3073	6	active
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, status, is_deleted, created_at, updated_at) FROM stdin;
1	admin	t	f	2025-08-03 12:40:45.245243	2025-08-03 12:40:45.245243
2	doctor	t	f	2025-08-03 12:40:45.245243	2025-08-03 12:40:45.245243
3	patient	t	f	2025-08-03 12:40:45.245243	2025-08-03 12:40:45.245243
\.


--
-- Data for Name: specializations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.specializations (id, name, is_deleted, created_at, updated_at, status) FROM stdin;
1	Cardiology	f	2025-08-03 13:02:45.21315	2025-08-03 13:02:45.21315	active
2	Dermatology	f	2025-08-03 13:02:45.21315	2025-08-03 13:02:45.21315	active
3	Neurology	f	2025-08-03 13:02:45.21315	2025-08-03 13:02:45.21315	active
4	Pediatrics	f	2025-08-03 13:02:45.21315	2025-08-03 13:02:45.21315	active
5	Orthopedics	f	2025-08-03 13:02:45.21315	2025-08-03 13:02:45.21315	active
6	Psychiatry	f	2025-08-03 13:02:45.21315	2025-08-03 13:02:45.21315	active
7	Radiology	f	2025-08-03 13:02:45.21315	2025-08-03 13:02:45.21315	active
8	General Surgery	f	2025-08-03 13:02:45.21315	2025-08-03 13:02:45.21315	active
9	Ophthalmology	f	2025-08-03 13:02:45.21315	2025-08-03 13:02:45.21315	active
10	Gynecology	f	2025-08-03 13:02:45.21315	2025-08-03 13:02:45.21315	active
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, role_id, is_deleted, created_at, updated_at, status) FROM stdin;
58321efd-49e5-4556-bac3-200e1d21cf11	John Doe	john@example.com	$2b$10$VD23oqbA/bBiBft7rU0bau294pzQ/pHMfDPYOFyLS3y2athH8BgFa	3	f	2025-08-03 12:45:29.724812	2025-08-03 12:45:29.724812	active
307fd20e-9fc1-418d-9a5a-28ce7e86269d	John Doe4	doctor7@example.com	$2b$10$GNjmKAiJvBjo1QzKS6qH.ek/LAyaYGqHKEmAOXucE.RKvoNMoIiyK	2	f	2025-08-03 13:48:32.751375	2025-08-03 13:48:32.751375	active
f2816157-fe1a-4362-bec4-c172c15a3073	John Doe4	doctor10@example.com	$2b$10$1/AsgTbT3lm0RcYQ9wqiWu62HHLLKD3flT7vVtz872B8QW750ioJW	2	f	2025-08-03 19:31:38.669529	2025-08-03 19:31:38.669529	active
62879668-1ae7-4b9b-bf38-8b80e9ab3bff	John Doe4	patient@example.com	$2b$10$E.28KR1smD9U6R2s9Vp.PesqJecLkNEWdORMWqBCidvkeRygmORuS	3	f	2025-08-03 19:32:17.01946	2025-08-03 19:32:17.01946	active
e967cec2-38f6-437e-b100-bd075c3c606b	John Doe4	patient1@example.com	$2b$10$vxbLPlZgc/nhndgILQfy3.IrhZ8M3RontAe10PsPSWLQ6UXVAJL5y	3	f	2025-08-03 20:05:27.777476	2025-08-03 20:05:27.777476	active
\.


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- Name: specializations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.specializations_id_seq', 10, true);


--
-- Name: doctor_availabilities PK_2a42931ed0fe3c6934b737c503a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_availabilities
    ADD CONSTRAINT "PK_2a42931ed0fe3c6934b737c503a" PRIMARY KEY (id);


--
-- Name: appointments appointments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointments
    ADD CONSTRAINT appointments_pkey PRIMARY KEY (id);


--
-- Name: doctor_block_dates doctor_block_dates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_block_dates
    ADD CONSTRAINT doctor_block_dates_pkey PRIMARY KEY (id);


--
-- Name: doctor_block_groups doctor_block_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_block_groups
    ADD CONSTRAINT doctor_block_groups_pkey PRIMARY KEY (id);


--
-- Name: doctor_specializations doctor_specializations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_specializations
    ADD CONSTRAINT doctor_specializations_pkey PRIMARY KEY (id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: specializations specializations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.specializations
    ADD CONSTRAINT specializations_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: doctor_block_dates FK_59c9125f34fb20c3f720d69ec79; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_block_dates
    ADD CONSTRAINT "FK_59c9125f34fb20c3f720d69ec79" FOREIGN KEY ("blockGroupId") REFERENCES public.doctor_block_groups(id);


--
-- Name: doctor_specializations FK_7368b601248cd61fadea853cccf; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_specializations
    ADD CONSTRAINT "FK_7368b601248cd61fadea853cccf" FOREIGN KEY ("specializationId") REFERENCES public.specializations(id);


--
-- Name: doctor_specializations FK_be32bc6a419fbd397c3f212ff90; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.doctor_specializations
    ADD CONSTRAINT "FK_be32bc6a419fbd397c3f212ff90" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

