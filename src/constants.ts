
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
    featured: string;
    globalParts: string;
    cncDescription: string;
    sqFtArea: string;
    monitoring: string;
    onTime: string;
    delivered: string;
    virtualConsultation: string;
    supportCenter: string;
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
    techExcellence: string;
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
    automationDesign: string;
    testingEquipment: string;
    maintenanceSupport: string;
  };
  product: {
    specTitle: string;
    share: string;
    longDescription: string;
    specs: {
      material: string;
      precision: string;
      temp: string;
      standard: string;
      application: string;
    };
    stockStatus: string;
    readyWarehouse: string;
    response24h: string;
    quotation: string;
    identifier: string;
    category: string;
    precisionSolutions: string;
    alloySteel: string;
    automotiveAero: string;
  };
  footer: {
    rights: string;
    desc: string;
    solutions: string;
    industries: string;
    privacy: string;
    terms: string;
    cookies: string;
    foodBeverage: string;
    automotiveOem: string;
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
      featured: "Unggulan",
      globalParts: "Suku Cadang Global",
      cncDescription: "Penelitian ilmiah, Permesinan, Industri Elektronik, Dirgantara",
      sqFtArea: "LUAS AREA",
      monitoring: "PEMANTAUAN",
      onTime: "TEPAT WAKTU",
      delivered: "Terkirim",
      virtualConsultation: "KONSULTASI VIRTUAL",
      supportCenter: "Pusat Dukungan",
      items: {
        "measuring-testing": "Measuring & testing equipment",
        "robotic-integration": "Robotic & integration",
        "pneumatic-system": "Pneumatic system",
        "conveyor-system": "Conveyor & system",
        "linear-motion": "Linier motion system",
        "miscellaneous": "Miscellaneous Equipment",
        "measuring-small": "Measuring Small Tool",
        "measuring-system": "Measuring System, 2D/3D measuring, optics",
        "material-testing": "Material testing equipment",
        "press-machine": "Press machine",
        "cnc-machine": "CNC machine tools",
        "others": "Others.",
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
      techExcellence: "Keunggulan Teknis",
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
      automationDesign: "Desain Otomasi",
      testingEquipment: "Peralatan Pengujian",
      maintenanceSupport: "Dukungan Pemeliharaan",
    },
    product: {
      specTitle: "Detail Spesifikasi Produk",
      share: "Bagikan",
      longDescription: "Setiap komponen dalam lini produk kami diproduksi dengan presisi ekstrem menggunakan teknologi permesinan mutakhir dan material kelas atas yang tahan terhadap korosi serta suhu ekstrem. Kami mengintegrasikan sistem kontrol kualitas berlapis untuk memastikan bahwa setiap unit yang didistribusikan ke wilayah MM2100 Bekasi memenuhi standar JIS (Japanese Industrial Standards) dan ISO internasional. Dengan fokus pada durabilitas jangka panjang dan efisiensi energi, solusi teknis kami dirancang untuk meminimalkan gesekan mekanis dan mengoptimalkan output produksi Anda, memberikan keandalan yang tak tertandingi bahkan dalam lingkungan manufaktur yang paling menuntut.",
      specs: {
        material: "Material",
        precision: "Presisi",
        temp: "Suhu Operasi",
        standard: "Standar",
        application: "Aplikasi",
      },
      stockStatus: "Status Stok",
      readyWarehouse: "Tersedia di Gudang",
      response24h: "Respons 24 Jam",
      quotation: "Minta Penawaran Harga",
      identifier: "Identifikasi Produk",
      category: "Kategori Katalog",
      precisionSolutions: "Solusi Teknik Presisi",
      alloySteel: "Paduan / Baja Kelas Premium",
      automotiveAero: "Otomotif / Elektronik / Dirgantara",
    },
    footer: {
      rights: "Semua Hak Dilindungi.",
      desc: "Memberikan layanan perdagangan teknis presisi tinggi dengan keandalan industri dan dukungan ahli untuk wilayah MM2100 Bekasi.",
      solutions: "Solusi",
      industries: "Industri",
      privacy: "Kebijakan Privasi",
      terms: "Syarat Ketentuan",
      cookies: "Kebijakan Cookie",
      foodBeverage: "Makanan & Minuman",
      automotiveOem: "Otomotif OEM",
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
      featured: "Featured",
      globalParts: "Global Parts",
      cncDescription: "Scientific research, Machining, Electronic industry, Aerospace",
      sqFtArea: "SQ FT AREA",
      monitoring: "MONITORING",
      onTime: "ON TIME",
      delivered: "Delivered",
      virtualConsultation: "VIRTUAL CONSULTATION",
      supportCenter: "Support Center",
      items: {
        "measuring-testing": "Measuring & testing equipment",
        "robotic-integration": "Robotic & integration",
        "pneumatic-system": "Pneumatic system",
        "conveyor-system": "Conveyor & system",
        "linear-motion": "Linier motion system",
        "miscellaneous": "Miscellaneous Equipment",
        "measuring-small": "Measuring Small Tool",
        "measuring-system": "Measuring System, 2D/3D measuring, optics",
        "material-testing": "Material testing equipment",
        "press-machine": "Press machine",
        "cnc-machine": "CNC machine tools",
        "others": "Others.",
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
      techExcellence: "Technical Excellence",
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
      automationDesign: "Automation Design",
      testingEquipment: "Testing Equipment",
      maintenanceSupport: "Maintenance Support",
    },
    product: {
      specTitle: "Detail Specification Product",
      share: "Share",
      longDescription: "Each component in our product line is manufactured with extreme precision using cutting-edge machining technology and high-grade materials resistant to corrosion and extreme temperatures. We integrate a multi-layered quality control system to ensure that every unit distributed to the MM2100 Bekasi region meets international JIS (Japanese Industrial Standards) and ISO standards. With a focus on long-term durability and energy efficiency, our technical solutions are designed to minimize mechanical friction and optimize your production output, providing unparalleled reliability even in the most demanding manufacturing environments.",
      specs: {
        material: "Material",
        precision: "Precision",
        temp: "Operating Temp",
        standard: "Standard",
        application: "Application",
      },
      stockStatus: "Stock Status",
      readyWarehouse: "Ready in Warehouse",
      response24h: "24-Hour Response",
      quotation: "Request Quotation",
      identifier: "Product Identifier",
      category: "Catalog Category",
      precisionSolutions: "Precision Engineering Solutions",
      alloySteel: "Premium Grade Alloy / Steel",
      automotiveAero: "Automotive / Electronic / Aero",
    },
    footer: {
      rights: "All Rights Reserved.",
      desc: "Delivering high-precision technical trading services with industrial reliability and expert support for the MM2100 Bekasi region.",
      solutions: "Solutions",
      industries: "Industries",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookies: "Cookies Policy",
      foodBeverage: "Food & Beverage",
      automotiveOem: "Automotive OEM",
    },
  },
};

export const categories = [
  { id: "measuring-testing", title: "Measuring & testing equipment", description: "Precision calibration and industrial testing solutions.", icon: "Micrometer", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" },
  { id: "robotic-integration", title: "Robotic & integration", description: "Automated robotic solutions for modern manufacturing.", icon: "Cpu", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" },
  { id: "pneumatic-system", title: "Pneumatic system", description: "Advanced pneumatic control components and systems.", icon: "Wind", image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&q=80&w=800" },
  { id: "conveyor-system", title: "Conveyor & system", description: "Industrial material handling and conveyor belt solutions.", icon: "Repeat", image: "https://images.unsplash.com/photo-1565151443833-29bf2ba5dd8d?auto=format&fit=crop&q=80&w=800" },
  { id: "linear-motion", title: "Linier motion system", description: "Linear motion technologies for technical machinery.", icon: "ArrowRightLeft", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800" },
  { id: "miscellaneous", title: "Miscellaneous Equipment", description: "Supplementary industrial tools and technical equipment.", icon: "Boxes", image: "https://images.unsplash.com/photo-1581092921461-7d15cb89053e?auto=format&fit=crop&q=80&w=800" },
  { id: "measuring-small", title: "Measuring Small Tool", description: "Handheld precision instruments for everyday measurements.", icon: "Ruler", image: "https://images.unsplash.com/photo-1530315598444-24933939379b?auto=format&fit=crop&q=80&w=800" },
  { id: "measuring-system", title: "Measuring System, 2D/3D measuring, optics", description: "Advanced 2D/3D and optical measuring technologies.", icon: "Scan", image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=800" },
  { id: "material-testing", title: "Material testing equipment", description: "Testing equipment for material integrity and strength.", icon: "HardDrive", image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?auto=format&fit=crop&q=80&w=800" },
  { id: "press-machine", title: "Press machine", description: "Industrial press solutions for forming and assembly.", icon: "Anchor", image: "https://images.unsplash.com/photo-1566353386641-7d1421ab2df1?auto=format&fit=crop&q=80&w=800" },
  { id: "cnc-machine", title: "CNC machine tools", description: "Precision CNC machinery for advanced manufacturing.", icon: "Settings", image: "https://images.unsplash.com/photo-1621905252507-b354bcadcabc?auto=format&fit=crop&q=80&w=800" },
  { id: "others", title: "Others.", description: "Specialized technical solutions for custom needs.", icon: "Plus", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" },
];

export const companyData = {
  name: "PT. Presitama Service Industry",
  address: "Kawasan Industri MM2100, Cibitung Bekasi 17520, Indonesia",
  email: "presitama01@gmail.com",
  phone: "+6281310318868",
  businessType: "Industrial Service & Trading",
  mapCoordinates: {
    lat: -6.313468,
    lng: 107.082684,
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

