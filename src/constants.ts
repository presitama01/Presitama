
export interface Translation {
  nav: {
    home: string;
    categories: string;
    about: string;
    contact: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
    contactCta: string;
  };
  about: {
    title: string;
    description: string;
    experience: string;
    projects: string;
    satisfaction: string;
  };
  categories: {
    title: string;
    subtitle: string;
    items: {
      [key: string]: string;
    };
  };
  contact: {
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    email: string;
    form: {
      name: string;
      email: string;
      subject: string;
      message: string;
      phone: string;
      submit: string;
    };
  };
  footer: {
    rights: string;
  };
}

export const translations: { id: Translation; en: Translation } = {
  id: {
    nav: {
      home: "Beranda",
      categories: "Kategori Produk",
      about: "Tentang Kami",
      contact: "Kontak",
    },
    hero: {
      badge: "Industrial Hero",
      title: "Trading Company Terpercaya",
      subtitle: "PT. Presitama Service Industry menyediakan berbagai komponen mesin industri dan alat teknik berkualitas tinggi untuk mendukung efisiensi operasional Anda.",
      cta: "Lihat Produk",
      contactCta: "Kontak Kami",
    },
    about: {
      title: "Tentang PT. Presitama Service Industry",
      description: "Kami adalah PT. Presitama Service Industry, perusahaan trading yang berbasis di Kawasan Industri MM2100, Cibitung. Kami berfokus pada penyediaan berbagai macam peralatan pengujian, sistem robotik, dan komponen mesin industri dengan standar kualitas internasional.",
      experience: "Tahun Pengalaman",
      projects: "Produk Terdistribusi",
      satisfaction: "Kepuasan Pelanggan",
    },
    categories: {
      title: "Kategori Produk Kami",
      subtitle: "Kami menawarkan berbagai macam produk teknis dari brand ternama untuk memenuhi kebutuhan industri Anda.",
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
    contact: {
      title: "Hubungi Kami",
      subtitle: "Konsultasikan kebutuhan teknis Anda dengan tim ahli kami.",
      address: "Alamat",
      phone: "Telp/WA",
      email: "Email",
      form: {
        name: "Nama Lengkap",
        email: "Alamat Email",
        subject: "Subjek",
        message: "Pesan Anda",
        phone: "No Telp/HP",
        submit: "Kirim Pesan",
      },
    },
    footer: {
      rights: "Semua Hak Dilindungi.",
    },
  },
  en: {
    nav: {
      home: "Home",
      categories: "Product Categories",
      about: "About Us",
      contact: "Contact",
    },
    hero: {
      badge: "Industrial Hero",
      title: "Trusted Trading Company",
      subtitle: "PT. Presitama Service Industry provides high-quality industrial machine components and technical tools to support your operational efficiency.",
      cta: "View Products",
      contactCta: "Contact Us",
    },
    about: {
      title: "About PT. Presitama Service Industry",
      description: "We are a trading company based in the MM2100 Industrial Area, Cibitung. We focus on providing a wide range of testing equipment, robotic systems, and industrial machine components with international quality standards.",
      experience: "Years of Experience",
      projects: "Products Distributed",
      satisfaction: "Client Satisfaction",
    },
    categories: {
      title: "Our Product Categories",
      subtitle: "We offer a wide range of technical products from renowned brands to meet your industrial needs.",
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
    contact: {
      title: "Contact Us",
      subtitle: "Consult your technical needs with our expert team.",
      address: "Address",
      phone: "Telp/WA",
      email: "Email",
      form: {
        name: "Full Name",
        email: "Email Address",
        subject: "Subject",
        message: "Your Message",
        phone: "Phone Number",
        submit: "Send Message",
      },
    },
    footer: {
      rights: "All Rights Reserved.",
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
    lat: -6.313467990095778,
    lng: 107.08268419439531
  }
};

export const testimonials = [
  {
    text: "Layanan PT. Presitama Service Industry sangat memuaskan. Peralatan ukur presisi mereka membantu kami menjaga standar kualitas di lini produksi.",
    author: "Produksi Manager",
    company: "Otomotif Bekasi",
    rating: 5
  },
  {
    text: "Solusi CNC dan dukungan teknisnya sangat responsif. Sangat membantu dalam meminimalisir downtime operasional pabrik.",
    author: "Technical Lead",
    company: "Elektronik MM2100",
    rating: 5
  },
  {
    text: "Pengiriman cepat dan suku cadang orisinal. Rekanan terpercaya untuk kebutuhan industri berkelanjutan.",
    author: "Purchasing Dept",
    company: "Manufaktur Umum",
    rating: 5
  }
];
