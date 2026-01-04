
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Service, TeamMember, Language, VisitLog, CustomerMessage, SocialLink, CircadianMode, ProgressStage, Material, Award, OfficeLocation, CoreValue, JobPosition, JobApplication } from './types';
import { dbService } from './services/dbService';

interface SiteData {
  projects: Project[];
  team: TeamMember[];
  services: Service[];
  socialLinks: SocialLink[];
  awards: Award[];
  locations: OfficeLocation[];
  jobPositions: JobPosition[];
  studioInfo: {
    name: string;
    email: string;
    phone: string;
    philosophy: string;
    philosophyEn: string;
    philosophySubtitle: string;
    philosophySubtitleEn: string;
    vision: string;
    visionEn: string;
    mission: string;
    missionEn: string;
    founderName: string;
    founderQuote: string;
    founderQuoteEn: string;
    founderImage?: string;
    coreValues: CoreValue[];
    adminPasscode: string;
    initialProjectCount: number;
    portfolioUrl: string;
    logo?: string;
    yearsExperience: number;
    address: string;
    addressEn: string;
  };
}

const initialData: SiteData = {
  projects: [
    {
      id: 1,
      title: "The Concrete Legacy Villa",
      titleEn: "The Concrete Legacy Villa",
      location: "Thảo Điền, Quận 2, TP. HCM",
      locationEn: "Thao Dien, District 2, HCMC",
      category: "Residential",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
      ],
      description: "Một tuyệt phẩm kiến trúc tối giản sử dụng bê tông trần kết hợp với các mảng kính lớn để xóa nhòa ranh giới giữa trong và ngoài.",
      descriptionEn: "A minimalist architectural masterpiece using raw concrete combined with large glass panels to blur the boundaries between inside and outside.",
      sqm: 450,
      year: 2023,
      client: "Ông Nguyễn Gia Bảo",
      clientEn: "Mr. Gia Bao Nguyen",
      coords: { lat: 10.803, lng: 106.732 },
      status: 'In Progress',
      progress: {
        clientCode: "AURA-LEGACY-001",
        currentStage: "Finishing",
        percentComplete: 85,
        logs: [
          {
            stage: "Concept",
            date: "12/05/2023",
            description: "Hoàn thành ý tưởng sơ bộ và thống nhất phong cách Brutalism.",
            completed: true
          },
          {
            stage: "Design",
            date: "20/07/2023",
            description: "Phê duyệt hồ sơ thiết kế kỹ thuật thi công và chỉ định vật liệu.",
            completed: true
          },
          {
            stage: "Construction",
            date: "15/11/2023",
            description: "Đang tiến hành đổ bê tông sàn tầng 2. Chất lượng bê tông đạt chuẩn mác cao.",
            images: ["https://images.unsplash.com/photo-1541913054-666300f08946?auto=format&fit=crop&w=800&q=80"],
            completed: true
          },
          {
            stage: "Finishing",
            date: "24/05/2024",
            description: "Hoàn thiện các hạng mục nội thất và cảnh quan",
            completed: false
          }
        ]
      },
      tags: ['Modern', 'Minimalist', 'Sustainable'],
      specs: [
        { label: 'Phong cách', labelEn: 'Style', value: 'Minimalist Brutalism' },
        { label: 'Vật liệu chính', labelEn: 'Primary Materials', value: 'Raw Concrete, Glass, Oak' },
        { label: 'Hướng nhà', labelEn: 'Orientation', value: 'South-East' },
        { label: 'Số tầng', labelEn: 'Floors', value: '3 Floors + Basement' }
      ]
    },
    {
      id: 2,
      title: "Aura Zen Retreat",
      titleEn: "Aura Zen Retreat",
      location: "Nam Hội An, Quảng Nam",
      locationEn: "Nam Hoi An, Quang Nam",
      category: "Hospitality",
      image: "https://images.unsplash.com/photo-1582719478237-9eba3359dbb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1582719478237-9eba3359dbb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1544161515-4ad6ce6ec896?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
      ],
      description: "Khu nghỉ dưỡng mang phong cách Wabi-sabi, kết hợp giữa sự mộc mạc của vật liệu tự nhiên và sự sang trọng tinh tế.",
      descriptionEn: "A Wabi-sabi style retreat, merging the rawness of natural materials with sophisticated luxury.",
      sqm: 1200,
      year: 2024,
      client: "Silk Path Group",
      clientEn: "Silk Path Group",
      status: 'Conceptual',
      tags: ['Wabi-sabi', 'Organic', 'Wellness', 'Hoi An', 'Resort'],
      specs: [
        { label: 'Vật liệu', labelEn: 'Materials', value: 'Bamboo, Stone, Reclaimed Wood' },
        { label: 'Mật độ xây dựng', labelEn: 'Build Density', value: '15%' },
        { label: 'Hệ thống năng lượng', labelEn: 'Energy System', value: 'Solar Integrated' }
      ]
    }
  ],
  jobPositions: [
    {
      id: 'archi-senior',
      title: 'Kiến trúc sư chủ trì',
      titleEn: 'Senior Lead Architect',
      department: 'Phòng Thiết kế',
      departmentEn: 'Design Dept',
      type: 'Full-time',
      active: true,
      description: 'Chủ trì các dự án biệt thự cao cấp và resort nghỉ dưỡng.',
      requirements: ['Ít nhất 5 năm kinh nghiệm', 'Thành thạo Revit/AutoCAD', 'Khả năng dẫn dắt đội ngũ']
    },
    {
      id: '3d-artist',
      title: 'Họa viên 3D kiến trúc',
      titleEn: '3D Architectural Artist',
      department: 'Phòng Diễn họa',
      departmentEn: 'Visualization Dept',
      type: 'Full-time',
      active: true,
      description: 'Diễn họa các ý tưởng thiết kế thành hình ảnh Render chất lượng cao.',
      requirements: ['Thành thạo 3dsMax/Corona/Enscape', 'Tư duy ánh sáng và vật liệu tốt']
    }
  ],
  team: [
    {
      id: 1,
      name: "KTS. Lê Anh Tuấn",
      role: "Architect",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      quote: "Kiến trúc là hơi thở của thời đại, là nơi di sản gặp gỡ tương lai.",
      quoteEn: "Architecture is the breath of the era, where legacy meets the future.",
      bio: "15 năm kinh nghiệm trong thiết kế kiến trúc bền vững và tối giản. Anh tin rằng kiến trúc thực sự phải phục vụ con người và thiên nhiên một cách hài hòa nhất.",
      bioEn: "15 years of experience in sustainable and minimalist architectural design. He believes that true architecture must serve humans and nature in the most harmonious way.",
      education: "Thạc sĩ Kiến trúc - ĐH Kiến trúc TP.HCM",
      educationEn: "Master of Architecture - UAH",
      projectsHandled: 45,
      projectIds: [1, 3],
      specialties: ["Kiến trúc bền vững", "Thiết kế Luxury Zen", "Quy hoạch cảnh quan"],
      specialtiesEn: ["Sustainable Architecture", "Luxury Zen Design", "Landscape Planning"],
      expertise: [
        { skill: "Sáng tạo ý tưởng", skillEn: "Creative Concept", level: 98 },
        { skill: "Giải pháp kĩ thuật", skillEn: "Technical Solutions", level: 92 },
        { skill: "Kiểm soát thi công", skillEn: "Construction Supervision", level: 85 }
      ],
      socialLinks: [
        { platform: 'Linkedin', url: '#' },
        { platform: 'Instagram', url: '#' }
      ]
    }
  ],
  services: [
    { 
      id: "architecture",
      title: "Thiết kế Kiến trúc", 
      titleEn: "Architectural Design",
      desc: "Tạo hình những không gia sống độc bản, bền vững và tối ưu công năng.",
      descEn: "Crafting unique, sustainable, and functional living spaces.",
      bgImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1000&q=80",
      subServices: ["Biệt thự cao cấp", "Căn hộ Penthouse", "Kiến trúc công cộng"],
      estimatedTime: "3 - 6 tháng",
      estimatedTimeEn: "3 - 6 months",
      investmentLevel: "Từ 15 tỷ VNĐ",
      investmentLevelEn: "From $600k USD",
      blueprintSample: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&w=800&q=80",
      process: [
        { title: "Khởi tạo", titleEn: "Initiation", desc: "Lắng nghe tâm tư và định hình ý tưởng.", descEn: "Listening to your thoughts and shaping ideas." },
        { title: "Phát triển", titleEn: "Development", desc: "Số hóa ý tưởng thành bản vẽ 3D chi tiết.", descEn: "Digitizing ideas into detailed 3D drawings." }
      ]
    }
  ],
  awards: [
    { id: '1', year: 2023, title: 'Kiến trúc xanh tiêu biểu', titleEn: 'Green Architecture Award', organization: 'Hội KTS Việt Nam', organizationEn: 'Vietnam Association of Architects' }
  ],
  locations: [
    { id: '1', name: 'Trụ sở chính Sài Gòn', nameEn: 'Saigon Headquarters', address: '123 Nguyễn Huệ, Quận 1, TP. HCM', addressEn: '123 Nguyen Hue, District 1, HCMC', phone: '+84 909 123 456', isMain: true }
  ],
  socialLinks: [
    { platform: 'Facebook', url: 'https://facebook.com/aurasaigon', active: true },
    { platform: 'Instagram', url: 'https://instagram.com/aurasaigon', active: true },
    { platform: 'Linkedin', url: 'https://linkedin.com/company/aurasaigon', active: true },
    { platform: 'Youtube', url: '', active: false },
    { platform: 'Tiktok', url: '', active: false },
    { platform: 'Website', url: '', active: false },
  ],
  studioInfo: {
    name: "Aura SÀI GÒN Studio",
    email: "hello@aurasaigon.studio",
    phone: "+84 909 123 456",
    address: "123 Nguyễn Huệ, Quận 1, TP. HCM",
    addressEn: "123 Nguyen Hue, District 1, HCMC",
    philosophySubtitle: "Kiến tạo di sản qua từng đường nét",
    philosophySubtitleEn: "Creating legacy through every line",
    philosophy: "Chúng tôi không chỉ xây dựng công trình, chúng tôi xây dựng tương lai. Tại Aura SÀI GÒN Studio, chúng tôi tin rằng sự tối giản chính là đỉnh cao của sự tinh tế. Chúng tôi tập trung vào việc tạo ra những không gian bền vững, nơi con người có thể tìm thấy sự cân bằng giữa cuộc sống hiện đại và thiên nhiên thuần khiết.",
    philosophyEn: "We don't just build structures; we build the future. At Aura SÀI GÒN Studio, we believe that minimalism is the pinnacle of sophistication. We focus on creating sustainable spaces where people can find balance between modern life and pure nature.",
    vision: "Trở thành studio kiến trúc hàng đầu Đông Nam Á, tiên phong trong việc kết hợp trí tuệ nhân tạo và kiến trúc bền vững.",
    visionEn: "To become the leading architectural studio in Southeast Asia, pioneering the integration of AI and sustainable architecture.",
    mission: "Mang lại không gian sống đẳng cấp, mang đậm dấu ấn cá nhân và tôn trọng tự nhiên cho mỗi khách hàng.",
    missionEn: "Providing premium living spaces that reflect individual identity and respect nature for every client.",
    founderName: "KTS. Lê Anh Tuấn",
    founderQuote: "Kiến trúc không chỉ là những khối bê tông, đó là cách chúng ta giao tiếp với thế giới và tương lai.",
    founderQuoteEn: "Architecture is not just concrete blocks; it's how we communicate with the world and the future.",
    founderImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    adminPasscode: "1234",
    initialProjectCount: 6,
    yearsExperience: 15,
    portfolioUrl: "https://example.com/portfolio.pdf",
    coreValues: [
      { 
        title: "Tối giản", 
        titleEn: "Minimalism", 
        desc: "Loại bỏ những thứ dư thừa để tôn vinh bản chất thực sự của không gian.", 
        descEn: "Removing the redundant to celebrate the true essence of space." 
      }
    ]
  }
};

interface AppContextType {
  data: SiteData;
  analytics: VisitLog[];
  messages: CustomerMessage[];
  applications: JobApplication[];
  updateData: (newData: Partial<SiteData>) => void;
  refreshAnalytics: () => Promise<void>;
  refreshMessages: () => Promise<void>;
  refreshApplications: () => Promise<void>;
  submitJobApplication: (app: Omit<JobApplication, 'id' | 'timestamp' | 'status'>) => Promise<void>;
  deleteJobApplication: (id: string) => Promise<void>;
  sendCustomerMessage: (msg: Omit<CustomerMessage, 'id' | 'timestamp' | 'read'>) => Promise<void>;
  deleteCustomerMessage: (id: string) => Promise<void>;
  markMessageRead: (id: string) => Promise<void>;
  resetToDefault: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations['vi']) => string;
  isReady: boolean;
  circadianMode: CircadianMode;
  activeMoodboard: Material[];
  updateMoodboard: (materials: Material[]) => void;
  clearMoodboard: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(initialData);
  const [analytics, setAnalytics] = useState<VisitLog[]>([]);
  const [messages, setMessages] = useState<CustomerMessage[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [lang, setLang] = useState<Language>('vi');
  const [isReady, setIsReady] = useState(false);
  const [circadianMode, setCircadianMode] = useState<CircadianMode>('day');
  const [activeMoodboard, setActiveMoodboard] = useState<Material[]>([]);

  useEffect(() => {
    const calculateMode = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 8) return 'dawn';
      if (hour >= 8 && hour < 16) return 'day';
      if (hour >= 16 && hour < 19) return 'golden';
      return 'night';
    };

    setCircadianMode(calculateMode());
    const interval = setInterval(() => setCircadianMode(calculateMode()), 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const initApp = async () => {
      try {
        await dbService.init();
        const storedData = await dbService.loadData();
        const storedLang = localStorage.getItem('archi_lang') as Language;

        if (storedData) {
          setData(storedData);
        } else {
          await dbService.saveData(initialData);
        }

        if (storedLang) {
          setLang(storedLang);
        }

        await dbService.logVisit();
        await refreshAnalytics();
        await refreshMessages();
        await refreshApplications();

        setTimeout(() => setIsReady(true), 1200);
      } catch (err) {
        console.error("Initialization Failed:", err);
        setIsReady(true);
      }
    };

    initApp();
  }, []);

  const refreshAnalytics = async () => {
    const latest = await dbService.getAnalytics();
    setAnalytics(latest);
  };

  const refreshMessages = async () => {
    const latest = await dbService.getMessages();
    setMessages(latest.sort((a, b) => b.timestamp - a.timestamp));
  };

  const refreshApplications = async () => {
    const latest = await dbService.getApplications();
    setApplications(latest.sort((a, b) => b.timestamp - a.timestamp));
  };

  const submitJobApplication = async (app: Omit<JobApplication, 'id' | 'timestamp' | 'status'>) => {
    const fullApp: JobApplication = {
      ...app,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      status: 'New'
    };
    await dbService.saveApplication(fullApp);
    await refreshApplications();
  };

  const deleteJobApplication = async (id: string) => {
    await dbService.deleteApplication(id);
    await refreshApplications();
  };

  const sendCustomerMessage = async (msg: Omit<CustomerMessage, 'id' | 'timestamp' | 'read'>) => {
    const fullMsg: CustomerMessage = {
      ...msg,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      read: false,
      moodboard: activeMoodboard.length > 0 ? activeMoodboard : undefined
    };
    await dbService.saveMessage(fullMsg);
    await refreshMessages();
  };

  const deleteCustomerMessage = async (id: string) => {
    await dbService.deleteMessage(id);
    await refreshMessages();
  };

  const markMessageRead = async (id: string) => {
    await dbService.markMessageRead(id);
    await refreshMessages();
  };

  const updateData = async (newData: Partial<SiteData>) => {
    const updatedState = { ...data, ...newData };
    if (newData.studioInfo) {
      updatedState.studioInfo = { ...data.studioInfo, ...newData.studioInfo };
    }
    setData(updatedState);
    
    try {
      await dbService.saveData(updatedState);
    } catch (err) {
      console.error("DB Save Error:", err);
    }
  };

  const resetToDefault = async () => {
    if (confirm('Khôi phục toàn bộ dữ liệu về mặc định?')) {
      setData(initialData);
      await dbService.saveData(initialData);
    }
  };

  const t = (key: string): string => {
    const trans = translations[lang] as any;
    return trans[key] || key;
  };

  const updateMoodboard = (materials: Material[]) => setActiveMoodboard(materials);
  const clearMoodboard = () => setActiveMoodboard([]);

  return (
    <AppContext.Provider value={{ 
      data, analytics, messages, applications,
      updateData, refreshAnalytics, refreshMessages, refreshApplications,
      submitJobApplication, deleteJobApplication,
      sendCustomerMessage, deleteCustomerMessage, markMessageRead,
      resetToDefault, lang, setLang, t, isReady, circadianMode,
      activeMoodboard, updateMoodboard, clearMoodboard
    }}>
      {children}
    </AppContext.Provider>
  );
};

const translations = {
  vi: {
    projects: 'Dự án',
    studio: 'Studio',
    services: 'Dịch vụ',
    team: 'Đội ngũ',
    aiVision: 'Tầm nhìn AI',
    contact: 'Liên hệ',
    yearsExp: 'Năm kinh nghiệm',
    completedProjects: 'Dự án hoàn thành',
    awards: 'Giải thưởng lớn',
    experts: 'Chuyên gia tư vấn',
    philosophyTitle: 'Triết lý của',
    legacyTitle: 'Chúng tôi kiến tạo di sản',
    legacySubtitle: 'qua từng đường nét.',
    teamTitle: 'Đội ngũ chuyên gia',
    teamVision: 'Những người hiện thực hóa',
    teamVisionSub: 'tầm nhìn của bạn.',
    teamDesc: 'Sự kết hợp hoàn hảo giữa những kiến trúc sư bay bổng, những nhà quản lý dự án kỷ luật và những chuyên gia thi công giàu kinh nghiệm.',
    portfolioTitle: 'Thư viện Di sản',
    selectedProjects: 'Kiến trúc chọn lọc',
    expertiseTitle: 'Năng lực cốt lõi',
    comprehensiveSolutions: 'Giải pháp kiến trúc toàn diện',
    expertiseDesc: 'Chúng tôi cung cấp quy trình khép kín từ khâu lên ý tưởng, tư vấn kỹ thuật đến giám sát thi công, đảm bảo mọi chi tiết đều đạt đến sự hoàn hảo.',
    downloadPDF: 'Tải hồ sơ năng lực (PDF)',
    all: 'Tất cả',
    residential: 'Nhà ở',
    commercial: 'Thương mại',
    hospitality: 'Nghỉ dưỡng',
    public: 'Công cộng',
    architect: 'Kiến trúc sư',
    projectManager: 'Quản lý dự án',
    constManager: 'Quản lý thi công',
    startStory: 'Bắt đầu câu chuyện của bạn.',
    readyToConnect: 'Bạn đã sẵn sàng để hiện thực hóa không gian mơ ước? Hãy kết nối với chúng tôi ngay hôm nay.',
    sendMessage: 'Gửi tin nhắn cho',
    fullName: 'Họ và tên',
    phoneNumber: 'Số điện thoại',
    projectDesc: 'Mô tả dự án',
    submitRequest: 'Gửi yêu cầu tư vấn',
    aiVisionLab: 'Archi Visionary Lab',
    aiConsultTitle: 'Tương lai của thiết kế nằm ở ý tưởng của bạn.',
    aiConsultDesc: 'Mô tả ngôi nhà trong mơ của bạn. AI của chúng tôi không chỉ tư vấn chuyên sâu mà còn có khả năng tạo ra một bản Render ý thực ngay tức thì.',
    withRender: 'Kèm ảnh Render',
    textOnly: 'Chỉ văn bản',
    generateVision: 'Khởi tạo Tầm nhìn',
    creating: 'Đang sáng tạo...',
    analyzing: 'Đang phân tích cấu trúc và ánh sáng cho ý tưởng của bạn...',
    liveConsultant: 'KTS AI Trực tuyến',
    talkToUs: 'Talk to us',
    endCall: 'Kết thúc cuộc gọi',
    speaking: 'Đang trả lời...',
    listening: 'Hãy nói về ý tưởng của bạn',
    sqm: 'm²',
    year: 'Năm',
    contactDetails: 'Liên hệ tư vấn dự án',
    heroTag: 'Excellence in Design',
    heroTitle: 'Kiến trúc Sống.',
    heroDesc: 'Chúng tôi kiến tạo những không gian vượt thời gian, nơi nghệ thuật gặp gỡ công năng và thiên nhiên hòa quyện trong từng viên gạch.',
    explore: 'Khám phá dự án',
    aboutUs: 'Về chúng tôi',
    loadingDB: 'Khởi tạo hệ thống lưu trữ v12...',
    ourValues: 'Giá trị cốt lõi',
    messages: 'Tin nhắn',
    featureDevelopment: 'Tính năng này hiện đang được phát triển. Vui lòng quay lại sau.',
    legacyTracker: 'Legacy Tracker',
    enterCode: 'Nhập mã dự án của bạn',
    trackProgress: 'Kiểm tra tiến độ',
    projectCode: 'Mã dự án (Ví dụ: AURA-VILLA-001)',
    currentStatus: 'Trạng thái hiện tại',
    designPhase: 'Giai đoạn thiết kế',
    constructionPhase: 'Giai đoạn thi công',
    handoverPhase: 'Bàn giao di sản',
    viewTimeline: 'Xem dòng thời gian chi tiết',
    siteUpdates: 'Cập nhật từ công trường',
    noProjectFound: 'Không tìm thấy dự án với mã số này.',
    materialMoodboard: 'Bảng vật liệu AI',
    addToMoodboard: 'Lưu vào Moodboard',
    added: 'Đã lưu',
    attachedMoodboard: 'Bảng vật liệu đính kèm',
    visionMission: 'Tầm nhìn & Sứ mệnh',
    awardsTitle: 'Thành tựu & Giải thưởng',
    locationsTitle: 'Văn phòng đại diện',
    founderMessage: 'Thông điệp sáng lập',
    theAuraProcess: 'Quy trình di sản Aura',
    stepTitle1: 'Định hình', stepDesc1: 'Khám phá mong muốn cốt lõi của khách hàng.',
    stepTitle2: 'Phát triển', stepDesc2: 'Kiến trúc hóa ý tưởng thành thực tế số.',
    stepTitle3: 'Thi công', stepDesc3: 'Hiện thực hóa với tiêu chuẩn kỹ thuật khắt khe.',
    stepTitle4: 'Bàn giao', stepDesc4: 'Chuyển giao một kiệt tác kiến trúc bền vững.',
    bespokePortfolio: 'Tùy chỉnh Hồ sơ năng lực',
    selectService: 'Chọn mảng dịch vụ Anh/Chị quan tâm:',
    buildPortfolio: 'Đóng gói Hồ sơ cá nhân hóa'
  },
  en: {
    projects: 'Projects',
    studio: 'Studio',
    services: 'Services',
    team: 'Team',
    aiVision: 'AI Vision',
    contact: 'Contact',
    yearsExp: 'Years Experience',
    completedProjects: 'Completed Projects',
    awards: 'Major Awards',
    experts: 'Consultants',
    philosophyTitle: 'Philosophy of',
    legacyTitle: 'We create legacy',
    legacySubtitle: 'through every line.',
    teamTitle: 'Expert Team',
    teamVision: 'The people who realize',
    teamVisionSub: 'your vision.',
    teamDesc: 'A perfect combination of creative architects, disciplined project managers, and experienced construction specialists.',
    portfolioTitle: 'Legacy Archive',
    selectedProjects: 'Selected Architecture',
    expertiseTitle: 'Core Capabilities',
    comprehensiveSolutions: 'Comprehensive Architectural Solutions',
    expertiseDesc: 'We provide an end-to-end process from conceptualization and technical consulting to construction supervision, ensuring every detail reaches perfection.',
    downloadPDF: 'Download Portfolio (PDF)',
    all: 'All',
    residential: 'Residential',
    commercial: 'Commercial',
    hospitality: 'Hospitality',
    public: 'Public',
    architect: 'Architect',
    projectManager: 'Project Manager',
    constManager: 'Construction Manager',
    startStory: 'Start your story.',
    readyToConnect: 'Ready to realize your dream space? Connect with us today.',
    sendMessage: 'Send a message to',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    projectDesc: 'Project Description',
    submitRequest: 'Submit Request',
    aiVisionLab: 'Archi Visionary Lab',
    aiConsultTitle: 'The future of design lies in your ideas.',
    aiConsultDesc: 'Describe your dream home. Our AI not only provides expert advice but also generates a conceptual render instantly.',
    withRender: 'With Render',
    textOnly: 'Text Only',
    generateVision: 'Generate Vision',
    creating: 'Creating...',
    analyzing: 'Analyzing structure and lighting for your idea...',
    liveConsultant: 'Live AI Architect',
    talkToUs: 'Talk to us',
    endCall: 'End Call',
    speaking: 'Speaking...',
    listening: 'Speak your ideas',
    sqm: 'sqm',
    year: 'Year',
    contactDetails: 'Contact for this project',
    heroTag: 'Excellence in Design',
    heroTitle: 'Living Architecture.',
    heroDesc: 'We create timeless spaces where art meets function and nature blends into every brick.',
    explore: 'Explore Projects',
    aboutUs: 'About Us',
    loadingDB: 'Initializing Storage v12...',
    ourValues: 'Core Values',
    messages: 'Messages',
    featureDevelopment: 'This feature is currently under development. Please check back later.',
    legacyTracker: 'Legacy Tracker',
    enterCode: 'Enter your project code',
    trackProgress: 'Track Progress',
    projectCode: 'Project Code (e.g., AURA-VILLA-001)',
    currentStatus: 'Current Status',
    designPhase: 'Design Phase',
    constructionPhase: 'Construction Phase',
    handoverPhase: 'Legacy Handover',
    viewTimeline: 'View Detailed Timeline',
    siteUpdates: 'Live Site Updates',
    noProjectFound: 'No project found with this code.',
    materialMoodboard: 'AI Material Moodboard',
    addToMoodboard: 'Add to Moodboard',
    added: 'Added',
    attachedMoodboard: 'Attached Moodboard',
    visionMission: 'Vision & Mission',
    awardsTitle: 'Awards & Achievements',
    locationsTitle: 'Our Offices',
    founderMessage: 'Founder Message',
    theAuraProcess: 'The Aura Legacy Process',
    stepTitle1: 'Definition', stepDesc1: 'Exploring client core desires.',
    stepTitle2: 'Evolution', stepDesc2: 'Architecturalizing ideas into digital reality.',
    stepTitle3: 'Realization', stepDesc3: 'Executing with strict technical standards.',
    stepTitle4: 'Legacy', stepDesc4: 'Handing over a sustainable masterpiece.',
    bespokePortfolio: 'Customized Portfolio',
    selectService: 'Select services you are interested in:',
    buildPortfolio: 'Package Personalized Portfolio'
  }
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
