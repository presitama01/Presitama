
export interface Translation {
  nav: {
    home: string;
    categories: string;
    about: string;
    process: string;
    contact: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
    contactCta: string;
    technicalHero: string;
    viewPortfolio: string;
    reqConsultation: string;
  };
  about: {
    title: string;
    description: string;
    experience: string;
    projects: string;
    satisfaction: string;
    activeClients: string;
    trustedBy: string;
    solutionDelivery: string;
  };
  categories: {
    title: string;
    subtitle: string;
    industrial: string;
    portfolio: string;
    specialized: string;
    fullCatalog: string;
    productDetails: string;
    back: string;
    items: {
      [key: string]: string;
    };
  };
  process: {
    badge: string;
    title: string;
    howWeHelp: string;
    steps: {
      sourcing: { t: string; d: string };
      supplyChain: { t: string; d: string };
      logistics: { t: string; d: string };
    };
    hubLabel: string;
    hubTitle: string;
    globalSourcing: string;
  };
  contact: {
    title: string;
    subtitle: string;
    getInTouch: string;
    readyToSupport: string;
    readyBold: string;
    desc: string;
    address: string;
    phone: string;
    email: string;
    labels: {
      phone: string;
      email: string;
      location: string;
    };
    form: {
      firstName: string;
      lastName: string;
      email: string;
      subject: string;
      message: string;
      phone: string;
      projectType: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
    };
  };
  product: {
    specTitle: string;
    share: string;
    specs: {
      material: string;
      precision: string;
      temp: string;
      standard: string;
      application: string;
    };
  };
  footer: {
    rights: string;
    desc: string;
  };
}

export const translations: { id: Translation; en: Translation } = {
  id: {
    nav: {
      home: "Beranda",
      categories: "Kategori Produk",
      about: "Tentang Kami",
      process: "Proses",
      contact: "Kontak",
    },
    hero: {
      badge: "Industrial Hero",
      title: "Trading Company Terpercaya",
      subtitle: "PT. Presitama Service Industry menyediakan berbagai komponen mesin industri dan alat teknik berkualitas tinggi untuk mendukung efisiensi operasional Anda.",
      cta: "Lihat Produk",
      contactCta: "Kontak Kami",
      technicalHero: "Hero Teknik",
      viewPortfolio: "Lihat Portofolio",
      reqConsultation: "Konsultasi Gratis",
    },
    about: {
      title: "Tentang Kami",
      description: "Kami adalah PT. Presitama Service Industry, perusahaan trading yang berbasis di Kawasan Industri MM2100, Cibitung. Kami berfokus pada penyediaan berbagai macam peralatan pengujian, sistem robotik, dan komponen mesin industri dengan standar kualitas internasional.",
      experience: "Tahun Pengalaman",
      projects: "Produk Terdistribusi",
      satisfaction: "Kepuasan",
      activeClients: "Klien Aktif",
      trustedBy: "Dipercaya oleh Pemimpin Industri",
      solutionDelivery: "Pengiriman Solusi Teknis",
    },
    categories: {
      title: "Kategori Produk Kami",
      subtitle: "Kami menawarkan berbagai macam produk teknis dari brand ternama untuk memenuhi kebutuhan industri Anda.",
      industrial: "Industri",
      portfolio: "Portofolio Teknis",
      specialized: "Segmen Khusus",
      fullCatalog: "Katalog Lengkap",
      productDetails: "DETAIL PRODUK",
      back: "Kembali",
      items: {
        "measuring-testing": "Alat Ukur & Pengujian",
        "robotic-integration": "Robotik & Integrasi",
        "pneumatic-system": "Sistem Pneumatik",
        "conveyor-system": "Konveyor & Sistem",
        "linear-motion": "Sistem Gerak Linier",
        "miscellaneous": "Peralatan Lain-lain",
        "measuring-small": "Alat Ukur Kecil",
        "measuring-system": "Sistem Pengukuran (2D/3D, Optik)",
        "material-testing": "Alat Uji Material",
        "press-machine": "Mesin Press",
        "cnc-machine": "Materials Testing Machine",
        "industrial-safety": "Keselamatan Industri",
        "cutting-tools": "Alat Potong (Cutting Tools)",
        "hydraulic-systems": "Sistem Hidrolik",
        "smart-factory": "Solusi Smart Factory",
        "others": "Lainnya",
      },
    },
    process: {
      badge: "Keahlian Kontrak",
      title: "Portofolio Teknis",
      howWeHelp: "Bagaimana Kami Membantu Mitra Industri Berkembang",
      steps: {
        sourcing: { 
          t: "Sourcing Konsultatif", 
          d: "Kami tidak hanya menjual suku cadang; kami menganalisis persyaratan teknis Anda untuk memberikan solusi mesin yang optimal." 
        },
        supplyChain: { 
          t: "Rantai Pasok Global", 
          d: "Kemitraan strategis dengan produsen global memastikan Anda mendapatkan suku cadang asli dengan biaya kompetitif." 
        },
        logistics: { 
          t: "Logistik Turnkey", 
          d: "Berkantor pusat di MM2100 Bekasi, kami menyediakan pengiriman tepat waktu untuk operasi industri kritis." 
        },
      },
      hubLabel: "Pusat Distribusi Lokal",
      hubTitle: "MM2100 Bekasi Distribution",
      globalSourcing: "Sourcing Global",
    },
    contact: {
      title: "Hubungi Kami",
      subtitle: "Konsultasikan kebutuhan teknis Anda dengan tim ahli kami.",
      getInTouch: "Hubungi Kami",
      readyToSupport: "Siap Mendukung",
      readyBold: "Operasi Anda?",
      desc: "Mari diskusikan kebutuhan teknis Anda dan bangun rantai pasokan yang tangguh bersama. Jadwalkan konsultasi untuk perawatan peralatan Anda berikutnya.",
      address: "Alamat",
      phone: "Telp/WA",
      email: "Email",
      labels: {
        phone: "Telepon",
        email: "Email",
        location: "Kawasan MM2100 Bekasi",
      },
      form: {
        firstName: "Nama Depan",
        lastName: "Nama Belakang",
        email: "Alamat Email",
        subject: "Subjek",
        message: "Pesan Anda",
        phone: "No Telp/HP",
        projectType: "Jenis Proyek",
        submit: "Kirim Pesan",
        submitting: "Mengirim...",
        success: "Pesan berhasil terkirim!",
        error: "Gagal mengirim pesan. Silakan coba lagi.",
      },
    },
    product: {
      specTitle: "Detail Spesifikasi Produk",
      share: "Bagikan",
      specs: {
        material: "Material",
        precision: "Presisi",
        temp: "Suhu Operasi",
        standard: "Standar",
        application: "Aplikasi",
      },
    },
    footer: {
      rights: "Semua Hak Dilindungi.",
      desc: "Memberikan layanan perdagangan teknis presisi tinggi dengan keandalan industri dan dukungan ahli untuk wilayah MM2100 Bekasi.",
    },
  },
  en: {
    nav: {
      home: "Home",
      categories: "Product Categories",
      about: "About Us",
      process: "Process",
      contact: "Contact",
    },
    hero: {
      badge: "Industrial Hero",
      title: "Trusted Trading Company",
      subtitle: "PT. Presitama Service Industry provides high-quality industrial machine components and technical tools to support your operational efficiency.",
      cta: "View Products",
      contactCta: "Contact Us",
      technicalHero: "Technical Hero",
      viewPortfolio: "View Portfolio",
      reqConsultation: "Request Consultation",
    },
    about: {
      title: "About Us",
      description: "We are a trading company based in the MM2100 Industrial Area, Cibitung. We focus on providing a wide range of testing equipment, robotic systems, and industrial machine components with international quality standards.",
      experience: "Years of Experience",
      projects: "Products Distributed",
      satisfaction: "Satisfaction",
      activeClients: "Active Clients",
      trustedBy: "Trusted by Industrial Leaders",
      solutionDelivery: "Technical Solution Delivery",
    },
    categories: {
      title: "Our Product Categories",
      subtitle: "We offer a wide range of technical products from renowned brands to meet your industrial needs.",
      industrial: "Industrial",
      portfolio: "Technical Portfolio",
      specialized: "Specialized Segments",
      fullCatalog: "Full Catalog",
      productDetails: "PRODUCT DETAILS",
      back: "Back",
      items: {
        "measuring-testing": "Measuring & Testing Equipment",
        "robotic-integration": "Robotic & Integration",
        "pneumatic-system": "Pneumatic System",
        "conveyor-system": "Conveyor & System",
        "linear-motion": "Linear Motion System",
        "miscellaneous": "Miscellaneous Equipment",
        "measuring-small": "Measuring Small Tool",
        "measuring-system": "Measuring System (2D/3D, Optics)",
        "material-testing": "Material Testing Equipment",
        "press-machine": "Press Machine",
        "cnc-machine": "Materials Testing Machine",
        "industrial-safety": "Industrial Safety",
        "cutting-tools": "Cutting Tools",
        "hydraulic-systems": "Hydraulic Systems",
        "smart-factory": "Smart Factory Solutions",
        "others": "Others",
      },
    },
    process: {
      badge: "Contracting Expertise",
      title: "Technical Portfolio",
      howWeHelp: "How We Help Industrial Partners Thrive",
      steps: {
        sourcing: { 
          t: "Consultative Sourcing", 
          d: "We don't just sell parts; we analyze your technical requirements to provide optimized machinery solutions." 
        },
        supplyChain: { 
          t: "Global Supply Chain", 
          d: "Strategic partnerships with global manufacturers ensure you get genuine parts at competitive costs." 
        },
        logistics: { 
          t: "Turnkey Logistics", 
          d: "Headquartered in MM2100 Bekasi, we provide just-in-time delivery for critical industrial operations." 
        },
      },
      hubLabel: "Local Support Hub",
      hubTitle: "MM2100 Bekasi Distribution",
      globalSourcing: "Global Sourcing",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Consult your technical needs with our expert team.",
      getInTouch: "Get In Touch",
      readyToSupport: "Ready to Support Your",
      readyBold: "Operations?",
      desc: "Let's discuss your technical needs and build a resilient supply chain together. Schedule a consultation for your next equipment maintenance.",
      address: "Address",
      phone: "Telp/WA",
      email: "Email",
      labels: {
        phone: "Phone",
        email: "Email",
        location: "MM2100 Bekasi Area",
      },
      form: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email Address",
        subject: "Subject",
        message: "Your Message",
        phone: "Phone Number",
        projectType: "Project Type",
        submit: "Send Message",
        submitting: "Sending...",
        success: "Message sent successfully!",
        error: "Failed to send message. Please try again.",
      },
    },
    product: {
      specTitle: "Detail Specification Product",
      share: "Share",
      specs: {
        material: "Material",
        precision: "Precision",
        temp: "Operating Temp",
        standard: "Standard",
        application: "Application",
      },
    },
    footer: {
      rights: "All Rights Reserved.",
      desc: "Delivering high-precision technical trading services with industrial reliability and expert support for the MM2100 Bekasi region.",
    },
  },
};

export const categories = [
  { id: "measuring-testing", icon: "Micrometer", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" },
  { id: "robotic-integration", icon: "Cpu", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" },
  { id: "pneumatic-system", icon: "Wind", image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800" },
  { id: "conveyor-system", icon: "Repeat", image: "https://images.unsplash.com/photo-1565151443833-29bf2ba5dd8d?auto=format&fit=crop&q=80&w=800" },
  { id: "linear-motion", icon: "ArrowRightLeft", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800" },
  { id: "miscellaneous", icon: "Boxes", image: "https://images.unsplash.com/photo-1581092921461-7d15cb89053e?auto=format&fit=crop&q=80&w=800" },
  { id: "measuring-small", icon: "Ruler", image: "https://images.unsplash.com/photo-1530315598444-24933939379b?auto=format&fit=crop&q=80&w=800" },
  { id: "measuring-system", icon: "Scan", image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=800" },
  { id: "material-testing", icon: "HardDrive", image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?auto=format&fit=crop&q=80&w=800" },
  { id: "press-machine", icon: "Anchor", image: "https://images.unsplash.com/photo-1566353386641-7d1421ab2df1?auto=format&fit=crop&q=80&w=800" },
  { id: "cnc-machine", icon: "Settings", image: "https://images.unsplash.com/photo-1621905252507-b354bcadcabc?auto=format&fit=crop&q=80&w=800" },
  { id: "industrial-safety", icon: "Shield", image: "https://images.unsplash.com/photo-1590486803833-2c7dc82c244b?auto=format&fit=crop&q=80&w=800" },
  { id: "cutting-tools", icon: "Scissors", image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&q=80&w=800" },
  { id: "hydraulic-systems", icon: "Droplets", image: "https://images.unsplash.com/photo-1516774435741-10ef396e4c6c?auto=format&fit=crop&q=80&w=800" },
  { id: "smart-factory", icon: "Binary", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc4b?auto=format&fit=crop&q=80&w=800" },
  { id: "others", icon: "Plus", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" },
];

export const companyData = {
  name: "PT. Presitama Service Industry",
  address: "Jl. Flores 1 Blok C No. 18, Kawasan Industri MM2100, Cibitung Bekasi 17520, Indonesia",
  email: "presitama01@gmail.com",
  phone: "+6281310318868",
  businessType: "Trading Company",
  mapCoordinates: {
    lat: -6.3108,
    lng: 107.1121,
  },
};

export const testimonialsData: { [key: string]: { text: string; author: string; company: string }[] } = {
  id: [
    {
      text: "Layanan PT. Presitama Service Industry sangat memuaskan. Peralatan ukur presisi mereka membantu kami menjaga standar kualitas di lini produksi.",
      author: "Manajer Produksi",
      company: "Otomotif Bekasi",
    },
    {
      text: "Solusi CNC dan dukungan teknisnya sangat responsif. Sangat membantu dalam meminimalisir downtime operasional pabrik.",
      author: "Technical Lead",
      company: "Elektronik MM2100",
    },
    {
      text: "Pengiriman cepat dan suku cadang orisinal. Rekanan terpercaya untuk kebutuhan industri berkelanjutan.",
      author: "Purchasing Dept",
      company: "Manufaktur Umum",
    }
  ],
  en: [
    {
      text: "PT. Presitama Service Industry service is very satisfying. Their precision measuring equipment helps us maintain quality standards on the production line.",
      author: "Production Manager",
      company: "Bekasi Automotive",
    },
    {
      text: "The CNC solutions and technical support are very responsive. Extremely helpful in minimizing factory operational downtime.",
      author: "Technical Lead",
      company: "MM2100 Electronics",
    },
    {
      text: "Fast delivery and original spare parts. A trusted partner for sustainable industrial needs.",
      author: "Purchasing Dept",
      company: "General Manufacturing",
    }
  ]
};

