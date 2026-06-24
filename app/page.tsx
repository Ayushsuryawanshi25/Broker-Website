"use client";

import Image from "next/image";
import {
  AlertCircle,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileText,
  Home,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Users
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const officeMapUrl = "https://maps.app.goo.gl/ZxeAitNKwtMyf2op7";

type ContactField = "name" | "phone" | "email" | "message";
type ContactErrors = Partial<Record<ContactField, string>>;

const contactFields: Array<{
  id: ContactField;
  label: string;
  type: string;
  placeholder: string;
  autoComplete: string;
  inputMode?: "email" | "tel" | "text";
  maxLength: number;
}> = [
  {
    id: "name",
    label: "Your Name",
    type: "text",
    placeholder: "Enter your full name",
    autoComplete: "name",
    inputMode: "text",
    maxLength: 80
  },
  {
    id: "phone",
    label: "Phone Number",
    type: "tel",
    placeholder: "10-digit mobile number",
    autoComplete: "tel",
    inputMode: "tel",
    maxLength: 15
  },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
    inputMode: "email",
    maxLength: 120
  }
];

const getFormValue = (formData: FormData, key: ContactField) => {
  return String(formData.get(key) ?? "").trim();
};

const validateContactForm = (formData: FormData) => {
  const errors: ContactErrors = {};
  const values = {
    name: getFormValue(formData, "name"),
    phone: getFormValue(formData, "phone"),
    email: getFormValue(formData, "email"),
    message: getFormValue(formData, "message")
  };
  const phoneDigits = values.phone.replace(/\D/g, "");

  if (values.name.length < 2) {
    errors.name = "Please enter your full name.";
  }

  if (!/^[a-zA-Z\s.'-]+$/.test(values.name)) {
    errors.name = "Name can only contain letters, spaces, dots, apostrophes, and hyphens.";
  }

  if (phoneDigits.length !== 10 && !(phoneDigits.length === 12 && phoneDigits.startsWith("91"))) {
    errors.phone = "Please enter a valid 10-digit phone number.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.message.length < 10) {
    errors.message = "Please write at least 10 characters so we can understand your requirement.";
  }

  if (values.message.length > 1000) {
    errors.message = "Please keep your message under 1000 characters.";
  }

  return { errors, values };
};

export default function HomePage() {
  const [activeNav, setActiveNav] = useState("home");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formErrors, setFormErrors] = useState<ContactErrors>({});

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const { errors, values } = validateContactForm(formData);

    setFormStatus("idle");
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      form.querySelector<HTMLElement>(`[name="${firstErrorField}"]`)?.focus();
      return;
    }

    if (String(formData.get("_honey") ?? "").trim()) {
      return;
    }

    formData.set("name", values.name);
    formData.set("phone", values.phone);
    formData.set("email", values.email);
    formData.set("message", values.message);
    formData.append("_subject", "New inquiry from Shivaay Enterprises website");
    formData.append("_template", "table");
    formData.append("_captcha", "false");

    setFormStatus("sending");

    try {
      const response = await fetch("https://formsubmit.co/ajax/enterpriseshivay09@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Unable to send message");
      }

      form.reset();
      setFormErrors({});
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-slate-900">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-[72px] items-center justify-between py-3">
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h1 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                Shivaay <span className="text-orange-700">Enterprises</span>
              </h1>
            </motion.div>
            <nav className="hidden items-center rounded-full border border-slate-200 bg-slate-50/70 px-2 py-1 md:flex">
              {["home", "about", "services", "gallery", "contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setActiveNav(item)}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${activeNav === item ? "text-orange-700" : "text-slate-600 hover:text-slate-950"
                    }`}
                >
                  {item}
                  {activeNav === item && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              ))}
            </nav>
            <motion.div
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.02 }}
            >
              <a href="tel:+917389922337" className="inline-flex items-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-orange-700">
                <Phone className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">73899-22337</span>
                <span className="sm:hidden">Call</span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden border-b border-slate-200 bg-[#fbfaf7] pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.p
                variants={fadeInUp}
                className="mb-5 inline-flex items-center rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-800 shadow-sm"
              >
                <BadgeCheck className="mr-2 h-4 w-4" />
                Residential, commercial and rental brokerage
              </motion.p>
              <motion.h2
                variants={fadeInUp}
                className="mb-6 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl"
              >
                Practical property guidance, handled with care.
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mb-8 max-w-2xl text-lg leading-8 text-slate-600"
              >
                Trusted real estate broker serving residential, commercial, and rental properties.
                Expert guidance from Satish Rai and the Shivaay Enterprises team.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg bg-slate-950 px-7 py-4 font-semibold text-white shadow-lg shadow-slate-900/10 transition-colors hover:bg-orange-700"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Discuss Requirement
                </motion.a>
                <motion.a
                  href="tel:+917389922337"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-7 py-4 font-semibold text-slate-800 shadow-sm transition-colors hover:border-orange-300 hover:text-orange-700"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </motion.a>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="mt-8 max-w-sm"
              >
                <motion.div
                  className="flex items-center rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  whileHover={{ y: -2 }}
                >
                  <Phone className="mr-3 h-5 w-5 text-orange-700" />
                  <div>
                    <p className="text-sm text-slate-500">Primary</p>
                    <a href="tel:+917389922337" className="font-semibold text-slate-950 hover:text-orange-700">73899-22337</a>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="relative overflow-hidden rounded-2xl border border-white bg-white shadow-2xl shadow-slate-900/10"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/office-exterior.jpg"
                    alt="Shivaay Enterprises office exterior"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-sm font-medium text-orange-100">Local market support</p>
                    <h3 className="mt-2 text-2xl font-semibold">Clear advice before every property decision.</h3>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x divide-slate-200 border-t border-slate-200 bg-white">
                  {[
                    ["15+", "Years Experience"],
                    ["500+", "Clients Guided"]
                  ].map(([value, label]) => (
                    <div key={label} className="p-5">
                      <p className="text-2xl font-semibold text-slate-950">{value}</p>
                      <p className="mt-1 text-sm text-slate-500">{label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 transform lg:block"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <a href="#about" className="flex flex-col items-center text-slate-400 hover:text-orange-700 transition-colors">
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">About us</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-950 mb-4">
              About Shivaay Enterprises
            </h2>
            <div className="w-20 h-1 bg-orange-700 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <h3 className="text-2xl font-semibold text-slate-950 mb-4 flex items-center">
                  <span className="w-10 h-10 bg-orange-50 border border-orange-100 rounded-lg flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-orange-700" />
                  </span>
                  Led by Satish Rai
                </h3>
                <p className="text-lg leading-8 text-slate-600">
                  Shivaay Enterprises is your trusted partner in real estate.
                  We specialize in helping families and businesses find their perfect property.
                </p>
              </motion.div>
              <motion.p variants={fadeInUp} className="text-lg leading-8 text-slate-600 mb-6">
                With years of experience in the local market, we offer comprehensive real estate solutions
                including residential sales, commercial properties, rental management, and property tax services.
              </motion.p>
              <motion.div variants={fadeInUp} className="space-y-4">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Home className="w-6 h-6 text-orange-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-950 mb-1">Wide Range of Properties</h4>
                    <p className="text-slate-600">From residential to commercial, we have it all</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <FileText className="w-6 h-6 text-orange-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-950 mb-1">Complete Documentation Support</h4>
                    <p className="text-slate-600">We handle all paperwork and legal formalities</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { title: "Expert Guidance", desc: "Professional advice at every step", icon: FileText },
                { title: "Local Knowledge", desc: "Deep understanding of the area", icon: MapPin },
                { title: "Trusted Service", desc: "Reliable and transparent", icon: ShieldCheck },
                { title: "Full Support", desc: "End-to-end assistance", icon: Users }
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  whileHover={{ y: -4 }}
                >
                  <item.icon className="mb-4 h-7 w-7 text-orange-700" />
                  <h3 className="font-semibold text-slate-950 mb-2">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">Services</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-950 mb-4">Our Services</h2>
            <div className="w-20 h-1 bg-orange-700 mx-auto rounded-full mb-4"></div>
            <p className="text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
              Comprehensive real estate solutions tailored to your needs
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                icon: Home,
                title: "Residential Properties",
                desc: "Duplex, flats, and plots for your dream home. We help you find the perfect residential property.",
                accent: "Residential"
              },
              {
                icon: Building2,
                title: "Commercial Spaces",
                desc: "Shops, offices, and commercial properties. Find the ideal location for your business.",
                accent: "Commercial"
              },
              {
                icon: FileText,
                title: "Rental Properties",
                desc: "All types of rental properties available. From apartments to commercial spaces.",
                accent: "Rental"
              },
              {
                icon: Users,
                title: "Additional Services",
                desc: "Property tax, MPEB connection, farmhouse land, and Nagar Nigam services.",
                accent: "Documentation"
              }
            ].map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg"
                  whileHover={{ y: -5 }}
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-orange-100 bg-orange-50">
                    <Icon className="h-6 w-6 text-orange-700" />
                  </div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">{service.accent}</p>
                  <h3 className="text-xl font-semibold text-slate-950 mb-3">{service.title}</h3>
                  <p className="leading-7 text-slate-600">{service.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="mt-12 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-semibold text-slate-950 mb-6 text-center">Service Support</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Khasra', 'Khatauni', 'Namantaran', 'Nagar Nigam', 'MPEB Connection', 'Property Tax', 'Interior Designing'].map((area, idx) => (
                <motion.span
                  key={area}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-orange-200 hover:bg-orange-50 hover:text-orange-800"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {area}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Office Gallery Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">Office</p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-950 mb-4">Our Office</h2>
            <div className="w-20 h-1 bg-orange-700 mx-auto rounded-full mb-4"></div>
            <p className="text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
              Visit us at our professional office space
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="relative group overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="/office-exterior.jpg"
                  alt="Shivaay Enterprises Office Exterior - Professional Real Estate Broker"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 to-transparent opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-semibold mb-2">Office Exterior</h3>
                    <p className="text-slate-200">Conveniently located and easy to find</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="relative group overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src="/office-interior.jpg"
                  alt="Shivaay Enterprises Office Interior - Professional Consultation Space"
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 to-transparent opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-semibold mb-2">Office Interior</h3>
                    <p className="text-slate-200">Comfortable space for consultations</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <motion.a
              href={officeMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-slate-950 px-8 py-4 font-semibold text-white shadow-lg shadow-slate-900/10 transition-colors hover:bg-orange-700"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <MapPin className="w-5 h-5 mr-2" />
              Visit Us Today
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-t border-slate-200 bg-[#fbfaf7] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <p className="inline-flex items-center rounded-full border border-orange-200 bg-white px-4 py-2 text-sm font-semibold text-orange-800 shadow-sm mb-4">
              <ShieldCheck className="w-4 h-4 mr-2" />
              Verified local property support
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-950 mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-orange-700 mx-auto rounded-full mb-4"></div>
            <p className="text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
              Ready to find your perfect property? Contact us today
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-8 lg:gap-12 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.h3 variants={fadeInUp} className="text-2xl font-semibold text-slate-950 mb-6">
                Contact Information
              </motion.h3>
              <div className="space-y-5">
                {[
                  {
                    icon: Phone,
                    title: "Phone Numbers",
                    content: (
                      <a href="tel:+917389922337" className="text-slate-600 hover:text-orange-700 block transition-colors">73899-22337</a>
                    ),
                    color: "bg-orange-50 text-orange-700 border-orange-100"
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    content: (
                      <a href="mailto:enterpriseshivay09@gmail.com" className="text-slate-600 hover:text-orange-700 transition-colors">
                        enterpriseshivay09@gmail.com
                      </a>
                    ),
                    color: "bg-slate-50 text-slate-700 border-slate-200"
                  },
                  {
                    icon: MapPin,
                    title: "Visit Our Office",
                    content: (
                      <p className="text-slate-600">Shivaay Enterprises<br />Your Local Real Estate Expert</p>
                    ),
                    color: "bg-orange-50 text-orange-700 border-orange-100",
                    href: officeMapUrl
                  }
                ].map((item) => {
                  const Icon = item.icon;
                  if (item.href) {
                    return (
                      <motion.a
                        key={item.title}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        variants={fadeInUp}
                        className="flex items-start rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                        whileHover={{ y: -2 }}
                        aria-label={`${item.title} on Google Maps`}
                      >
                        <div className={`w-12 h-12 rounded-lg border flex items-center justify-center mr-4 flex-shrink-0 ${item.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-950 mb-1">{item.title}</h3>
                          {item.content}
                        </div>
                      </motion.a>
                    );
                  }

                  return (
                    <motion.div
                      key={item.title}
                      variants={fadeInUp}
                      className="flex items-start rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                      whileHover={{ y: -2 }}
                    >
                      <div className={`w-12 h-12 rounded-lg border flex items-center justify-center mr-4 flex-shrink-0 ${item.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-950 mb-1">{item.title}</h3>
                        {item.content}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                variants={fadeInUp}
                className="mt-8 grid sm:grid-cols-2 gap-4"
              >
                {[
                  { icon: Clock, title: "Fast Response", text: "We usually respond within business hours." },
                  { icon: ShieldCheck, title: "Private Details", text: "Your enquiry is only used for property support." }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                      <Icon className="w-6 h-6 text-orange-700 mb-3" />
                      <h4 className="font-semibold text-slate-950">{item.title}</h4>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{item.text}</p>
                    </div>
                  );
                })}
              </motion.div>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-slate-950">Send Us a Message</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Share your requirement and we will contact you with suitable options.
                </p>
              </div>
              <form className="space-y-5" onSubmit={handleContactSubmit} noValidate>
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                {contactFields.map((field) => (
                  <motion.div
                    key={field.id}
                    whileFocus={{ scale: 1.02 }}
                  >
                    <label htmlFor={field.id} className="block text-sm font-semibold text-slate-800 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.id}
                      name={field.id}
                      autoComplete={field.autoComplete}
                      inputMode={field.inputMode}
                      maxLength={field.maxLength}
                      aria-invalid={Boolean(formErrors[field.id])}
                      aria-describedby={formErrors[field.id] ? `${field.id}-error` : undefined}
                      onChange={() => {
                        if (formErrors[field.id]) {
                          setFormErrors((current) => ({ ...current, [field.id]: undefined }));
                        }
                        if (formStatus !== "idle") {
                          setFormStatus("idle");
                        }
                      }}
                      className={`w-full rounded-lg border px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 ${formErrors[field.id]
                        ? "border-red-400 bg-red-50/40"
                        : "border-gray-300 bg-white focus:border-transparent"
                        }`}
                      placeholder={field.placeholder}
                      required
                    />
                    {formErrors[field.id] && (
                      <p id={`${field.id}-error`} className="mt-2 flex items-start text-sm font-medium text-red-700">
                        <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                        {formErrors[field.id]}
                      </p>
                    )}
                  </motion.div>
                ))}

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-slate-800 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    maxLength={1000}
                    aria-invalid={Boolean(formErrors.message)}
                    aria-describedby={formErrors.message ? "message-error" : "message-help"}
                    onChange={() => {
                      if (formErrors.message) {
                        setFormErrors((current) => ({ ...current, message: undefined }));
                      }
                      if (formStatus !== "idle") {
                        setFormStatus("idle");
                      }
                    }}
                    className={`w-full rounded-lg border px-4 py-3 text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 resize-none ${formErrors.message
                      ? "border-red-400 bg-red-50/40"
                      : "border-gray-300 bg-white focus:border-transparent"
                      }`}
                    placeholder="Tell us about your property requirements"
                    required
                  ></textarea>
                  {formErrors.message ? (
                    <p id="message-error" className="mt-2 flex items-start text-sm font-medium text-red-700">
                      <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      {formErrors.message}
                    </p>
                  ) : (
                    <p id="message-help" className="mt-2 text-sm text-slate-500">
                      Include property type, preferred area, budget, and timeline if possible.
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="inline-flex w-full items-center justify-center rounded-lg bg-slate-950 px-8 py-4 font-semibold text-white shadow-lg shadow-slate-900/10 transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-70"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {formStatus === "sending" ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {formStatus === "success" && (
                  <p className="flex items-start rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800" role="status">
                    <CheckCircle2 className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    Thank you. Your message has been sent successfully.
                  </p>
                )}

                {formStatus === "error" && (
                  <p className="flex items-start rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800" role="alert">
                    <AlertCircle className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    Sorry, your message could not be sent. Please try again or call us directly.
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-bold mb-4">Shivaay Enterprises</h3>
              <p className="leading-7 text-slate-400">
                Your trusted real estate broker for residential, commercial, and rental properties.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {["home", "about", "services", "gallery", "contact"].map((link) => (
                  <li key={link}>
                    <a href={`#${link}`} className="text-slate-400 hover:text-white transition-colors capitalize">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Proprietor: Satish Rai</li>
                <li><a href="tel:+917389922337" className="hover:text-white transition-colors">73899-22337</a></li>
                <li><a href="mailto:enterpriseshivay09@gmail.com" className="hover:text-white transition-colors">enterpriseshivay09@gmail.com</a></li>
              </ul>
            </motion.div>
          </motion.div>
          <motion.div
            className="border-t border-slate-800 pt-8 text-center text-slate-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2026 Shivaay Enterprises. All rights reserved. | Real Estate Broker Services</p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
