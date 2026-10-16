export interface LexicalChunk {
  phrase: string;
  ipa?: string;
  meaningVi: string;
  example: string;
  exampleVi: string;
  collocationTip?: string;
}

export interface ShadowingItem {
  id: string;
  text: string;
  translationVi: string;
  intonationTip: string;
  linkingTip?: string;
  speakerRole: string;
}

export interface DayLesson {
  day: number;
  month: 1 | 2 | 3;
  titleEn: string;
  titleVi: string;
  theme: string;
  cefrFocus: 'A2 → B1' | 'B1' | 'B1 → B1+' | string;
  scenarioDescription: string;
  aiPersonaRole: string;
  userRole: string;
  roleplayGoal: string;
  initialAiGreeting: {
    en: string;
    vi: string;
    suggestedA2: string;
    suggestedB1: string;
  };
  chunks: LexicalChunk[];
  shadowingDrills: ShadowingItem[];
  bedtimeReflex: {
    scenarioVi: string;
    challengePromptEn: string;
    sampleReflexA2: string;
    sampleReflexB1: string;
    pedagogicalKey: string;
  };
}

// Cấu trúc dữ liệu nén thông minh cho các ngày chuyên đề để đảm bảo 90 ngày đầy đủ 100%
interface CompactDayBlueprint {
  day: number;
  titleEn: string;
  titleVi: string;
  theme: string;
  aiPersonaRole: string;
  userRole: string;
  scenarioDescription: string;
  roleplayGoal: string;
  greetingEn: string;
  greetingVi: string;
  suggestedA2: string;
  suggestedB1: string;
  chunks: [string, string, string, string, string, string][]; // [phrase, ipa, meaningVi, example, exampleVi, tip]
}

// ============================================================================
// PHẦN 1: 15 NGÀY CỘT MỐC TRỌNG TÂM (FLAGSHIP MILESTONE LESSONS)
// ============================================================================
const FLAGSHIP_LESSONS: DayLesson[] = [
  {
    day: 1,
    month: 1,
    titleEn: 'Breaking the Ice & Executive Self-Introduction',
    titleVi: 'Phá băng & Giới thiệu Bản thân Chuyên nghiệp',
    theme: 'Personal Identity & Professional Networking',
    cefrFocus: 'A2 → B1',
    scenarioDescription:
      'Bạn tham gia một buổi giao lưu chuyên gia quốc tế (International Networking Night). AI là người điều phối thân thiện bắt chuyện tại quầy đồ uống.',
    aiPersonaRole: 'Alex - Điều phối viên Cộng đồng Quốc tế',
    userRole: 'Chuyên gia tham dự buổi giao lưu lần đầu',
    roleplayGoal:
      'Giới thiệu bản thân trôi chảy trong 3 câu, chia sẻ công việc và sở thích tự nhiên mà không dùng mẫu câu máy móc.',
    initialAiGreeting: {
      en: "Hi there! I don't think we've met yet. I'm Alex. What brought you to this networking event tonight?",
      vi: 'Chào bạn! Hình như chúng ta chưa gặp nhau thì phải. Mình là Alex. Cơ duyên nào đưa bạn đến buổi giao lưu tối nay thế?',
      suggestedA2: 'Hi Alex! Nice to meet you. I want to practice my English and meet new people.',
      suggestedB1:
        "Hey Alex, great to meet you! To be honest, I'm trying to step out of my comfort zone and expand my professional network.",
    },
    chunks: [
      {
        phrase: 'step out of my comfort zone',
        ipa: '/stɛp aʊt əv maɪ ˈkʌmfərt zoʊn/',
        meaningVi: 'Bước ra khỏi vùng an toàn của bản thân',
        example: 'I decided to join this international project to step out of my comfort zone.',
        exampleVi: 'Tôi quyết định tham gia dự án quốc tế này để bước ra khỏi vùng an toàn.',
        collocationTip: 'Dùng nguyên cụm để thể hiện tinh thần cầu tiến ở tuổi 30+.',
      },
      {
        phrase: 'be really into something',
        ipa: '/bi ˈrɪəli ˈɪntu ˈsʌmθɪŋ/',
        meaningVi: 'Rất đam mê / hứng thú với điều gì (tự nhiên hơn "I like")',
        example: "Lately, I've been really into landscape photography and running.",
        exampleVi: 'Dạo gần đây, mình rất đam mê nhiếp ảnh phong cảnh và chạy bộ.',
        collocationTip: 'Thay thế hoàn hảo cho "I like / I love" trong giao tiếp người lớn.',
      },
      {
        phrase: 'what brought you to...?',
        ipa: '/wʌt brɔːt juː tuː/',
        meaningVi: 'Cơ duyên nào đưa bạn đến...? (Hỏi lý do lịch sự)',
        example: 'What brought you to work in this industry?',
        exampleVi: 'Cơ duyên nào đưa bạn đến làm việc trong ngành này?',
        collocationTip: 'Lịch sự và gắn kết hơn rất nhiều so với "Why do you come here?"',
      },
      {
        phrase: 'to be honest with you',
        ipa: '/tə bi ˈɑːnɪst wɪð juː/',
        meaningVi: 'Thành thật với bạn thì...',
        example: 'To be honest with you, speaking English used to make me nervous.',
        exampleVi: 'Thành thật với bạn, trước đây nói tiếng Anh từng làm tôi khá hồi hộp.',
        collocationTip: 'Cụm từ đệm (discourse marker) giúp bạn có thêm 2 giây suy nghĩ ý tiếp theo.',
      },
    ],
    shadowingDrills: [
      {
        id: 'd1-s1',
        text: "Hi there! I don't think we've met yet. I'm Alex.",
        translationVi: 'Chào bạn! Hình như chúng ta chưa gặp nhau. Tôi là Alex.',
        intonationTip: 'Lên giọng nhẹ ở "yet", hạ giọng dứt khoát và ấm áp ở "Alex".',
        linkingTip: 'Nối âm: don\'t_think, we\'ve_met.',
        speakerRole: 'Alex (Native Speaker)',
      },
      {
        id: 'd1-s2',
        text: "I'm trying to step out of my comfort zone and sharpen my speaking.",
        translationVi: 'Tôi đang cố gắng bước ra khỏi vùng an toàn và mài sắc kỹ năng nói.',
        intonationTip: 'Nhấn mạnh trọng âm vào "step out" và "comfort zone".',
        linkingTip: 'Nối âm mượt: step_out_of.',
        speakerRole: 'Học viên (Giọng mẫu B1)',
      },
      {
        id: 'd1-s3',
        text: "Lately, I've been really into running to stay in shape.",
        translationVi: 'Dạo này mình rất hứng thú với việc chạy bộ để giữ dáng.',
        intonationTip: 'Ngắt nhịp nhẹ sau "Lately,", nhấn rõ "really into".',
        linkingTip: 'Nối âm: stay_in_shape.',
        speakerRole: 'Học viên (Giọng mẫu B1)',
      },
    ],
    bedtimeReflex: {
      scenarioVi: 'Một đối tác nước ngoài hỏi bạn trong giờ nghỉ giải lao: "So, how was your first day at the conference?"',
      challengePromptEn: 'Answer within 5 seconds using "To be honest" and "step out of my comfort zone".',
      sampleReflexA2: 'To be honest, it was busy, but I am happy to be here.',
      sampleReflexB1:
        'To be honest, talking to so many people felt like stepping out of my comfort zone, but it has been super rewarding!',
      pedagogicalKey: 'Phản xạ mở đầu bằng cụm từ đệm để xóa bỏ khoảng lặng ngập ngừng.',
    },
  },
  {
    day: 2,
    month: 1,
    titleEn: 'Ordering Coffee & Customizing Drinks Before Work',
    titleVi: 'Gọi Cà phê Sáng & Yêu cầu Pha chế Riêng',
    theme: 'Business Cafe Culture & Polite Requests',
    cefrFocus: 'A2 → B1',
    scenarioDescription:
      'Bạn đang ở một quán cafe tại trung tâm Singapore trước giờ họp sáng. Nhân viên pha chế hỏi nhanh đồ uống bạn muốn gọi.',
    aiPersonaRole: 'Sam - Barista năng động tại Singapore',
    userRole: 'Khách hàng công sở gọi cà phê ít đá, đổi sữa hạt',
    roleplayGoal: 'Gọi món trôi chảy, yêu cầu giảm ngọt/đá và hỏi mật khẩu Wi-Fi để check email.',
    initialAiGreeting: {
      en: 'Morning! Welcome in. What can I get started for you today?',
      vi: 'Chào buổi sáng! Mình làm món gì để khởi đầu ngày mới cho bạn hôm nay nào?',
      suggestedA2: 'Can I have an iced latte with less sugar, please?',
      suggestedB1: 'Morning! Could I get a medium iced latte with oat milk, easy on the ice?',
    },
    chunks: [
      {
        phrase: 'easy on the ice / sugar',
        ipa: '/ˈiːzi ɑːn ðə aɪs/',
        meaningVi: 'Cho ít đá / ít đường thôi nhé',
        example: 'Could I get an iced Americano, easy on the ice?',
        exampleVi: 'Cho mình một cốc Americano đá, ít đá thôi nhé.',
        collocationTip: 'Cấu trúc chuẩn bản xứ thay thế cho cách nói cứng nhắc "less ice".',
      },
      {
        phrase: 'could I get... to go?',
        ipa: '/kʊd aɪ ɡɛt ... tə ɡoʊ/',
        meaningVi: 'Cho tôi món... mang đi nhé',
        example: 'Could I get a hot flat white to go, please?',
        exampleVi: 'Cho mình một ly flat white nóng mang đi nhé.',
        collocationTip: 'Lịch sự và tự nhiên hơn rất nhiều so với "Give me..."',
      },
      {
        phrase: 'swap regular milk for oat milk',
        ipa: '/swɑːp ˈrɛɡjələr mɪlk fɔːr oʊt mɪlk/',
        meaningVi: 'Đổi sữa thường sang sữa yến mạch',
        example: 'Is it possible to swap regular milk for oat milk?',
        exampleVi: 'Có thể đổi sữa thường sang sữa yến mạch giúp mình được không?',
        collocationTip: 'Dùng động từ "swap A for B" cực kỳ linh hoạt khi muốn đổi thành phần.',
      },
      {
        phrase: 'pay by contactless',
        ipa: '/peɪ baɪ ˈkɑːntæktləs/',
        meaningVi: 'Thanh toán chạm thẻ / Apple Pay',
        example: "I'll pay by contactless, thanks!",
        exampleVi: 'Mình thanh toán chạm thẻ nhé, cảm ơn bạn!',
        collocationTip: 'Cụm từ thực tế xuất hiện mỗi ngày khi đi công tác nước ngoài.',
      },
    ],
    shadowingDrills: [
      {
        id: 'd2-s1',
        text: 'Morning! What can I get started for you today?',
        translationVi: 'Chào buổi sáng! Mình làm món gì cho bạn hôm nay nào?',
        intonationTip: 'Giọng tươi vui, lên giọng nhẹ ở cuối câu "today?".',
        linkingTip: 'Nối âm: get_started_for_you.',
        speakerRole: 'Sam (Barista)',
      },
      {
        id: 'd2-s2',
        text: 'Could I get a medium flat white with oat milk, easy on the ice?',
        translationVi: 'Cho mình một ly flat white cỡ vừa với sữa yến mạch, ít đá nhé?',
        intonationTip: 'Lên giọng lịch sự ở cuối câu để thể hiện sự tôn trọng.',
        linkingTip: 'Nối âm: Could_I_get_a, easy_on.',
        speakerRole: 'Học viên (Giọng mẫu B1)',
      },
    ],
    bedtimeReflex: {
      scenarioVi: 'Nhân viên thu ngân hỏi nhanh: "Is that for here or to go, and how would you like to pay?"',
      challengePromptEn: 'Answer immediately specifying "to go" and "contactless".',
      sampleReflexA2: 'To go, please. I will pay by card.',
      sampleReflexB1: "I'll have it to go, please, and I'll pay by contactless!",
      pedagogicalKey: 'Phản xạ tức thì trước câu hỏi kép tại quầy dịch vụ.',
    },
  },
  {
    day: 3,
    month: 1,
    titleEn: 'Navigating Streets & Finding Venue Locations',
    titleVi: 'Hỏi đường & Định vị Tòa nhà Hội nghị',
    theme: 'Urban Navigation & Business Travel',
    cefrFocus: 'A2 → B1',
    scenarioDescription:
      'Bạn đang đi công tác tại Melbourne và cần tìm lối vào Trung tâm Hội nghị trước giờ khai mạc 15 phút nhưng định vị điện thoại bị lệch.',
    aiPersonaRole: 'Liam - Người dân địa phương nhiệt tình tại Melbourne',
    userRole: 'Chuyên gia đi công tác đang tìm tòa nhà hội nghị',
    roleplayGoal: 'Hỏi đường lịch sự, xác nhận khoảng cách đi bộ và cảm ơn tự nhiên.',
    initialAiGreeting: {
      en: 'Excuse me! You look a bit turned around. Are you looking for a specific building around here?',
      vi: 'Xin lỗi! Trông bạn có vẻ đang tìm đường. Bạn đang tìm tòa nhà nào quanh đây phải không?',
      suggestedA2: 'Yes! Can you tell me the way to the Convention Center?',
      suggestedB1:
        "Oh thank goodness! I'm trying to get to the Convention Center, but my GPS is acting up.",
    },
    chunks: [
      {
        phrase: 'my GPS is acting up',
        ipa: '/maɪ dʒiːpiːˈɛs ɪz ˈæktɪŋ ʌp/',
        meaningVi: 'Định vị GPS của tôi đang bị chập chờn / dở chứng',
        example: 'Sorry I am late, my phone was acting up this morning.',
        exampleVi: 'Xin lỗi tôi đến muộn, sáng nay điện thoại của tôi tự nhiên dở chứng.',
        collocationTip: 'Cụm "act up" dùng cực hay khi máy móc, thiết bị hoặc phần mềm gặp trục trặc.',
      },
      {
        phrase: 'within walking distance',
        ipa: '/wɪˈðɪn ˈwɔːkɪŋ ˈdɪstəns/',
        meaningVi: 'Trong tầm đi bộ (không cần bắt xe)',
        example: 'Is the hotel within walking distance from the metro station?',
        exampleVi: 'Khách sạn có nằm trong tầm đi bộ từ ga tàu điện không?',
        collocationTip: 'Chuẩn câu hỏi của người đi công tác thay vì hỏi "How many kilometers?".',
      },
      {
        phrase: "you can't miss it",
        ipa: '/juː kænt mɪs ɪt/',
        meaningVi: 'Bạn không thể nào nhìn nhầm được đâu (vì nó rất nổi bật)',
        example: "It's right next to the glass tower; you can't miss it!",
        exampleVi: 'Nó nằm ngay cạnh tòa tháp kính, bạn không thể nhìn nhầm được đâu!',
        collocationTip: 'Câu cửa miệng của người bản xứ khi chỉ đường.',
      },
      {
        phrase: 'hang a left / hang a right',
        ipa: '/hæŋ ə lɛft/',
        meaningVi: 'Rẽ trái / rẽ phải (khẩu ngữ tự nhiên)',
        example: 'Go straight for two blocks and hang a left at the traffic lights.',
        exampleVi: 'Đi thẳng qua hai dãy nhà rồi rẽ trái ở chỗ đèn giao thông nhé.',
        collocationTip: 'Giúp bạn nghe hiểu ngay khi người bản xứ chỉ đường nhanh.',
      },
    ],
    shadowingDrills: [
      {
        id: 'd3-s1',
        text: 'Is the convention center within walking distance, or should I grab a cab?',
        translationVi: 'Trung tâm hội nghị có đi bộ tới được không, hay tôi nên bắt taxi?',
        intonationTip: 'Lên giọng ở "walking distance", hạ giọng ở "grab a cab".',
        linkingTip: 'Nối âm: within_walking, grab_a_cab.',
        speakerRole: 'Học viên (Giọng mẫu B1)',
      },
      {
        id: 'd3-s2',
        text: "It's just a five-minute walk down this avenue. You can't miss it!",
        translationVi: 'Chỉ đi bộ khoảng 5 phút dọc đại lộ này thôi. Bạn không thể lỡ nó được đâu!',
        intonationTip: 'Nhấn mạnh đầy khích lệ ở "can\'t miss it!".',
        linkingTip: 'Nối âm: walk_down, miss_it.',
        speakerRole: 'Liam (Native Speaker)',
      },
    ],
    bedtimeReflex: {
      scenarioVi: 'Đồng nghiệp nước ngoài hỏi bạn: "Is the restaurant far from our office?"',
      challengePromptEn: 'Answer that it is within walking distance and right across the street.',
      sampleReflexA2: 'No, it is very close. Just across the street.',
      sampleReflexB1: "Not at all! It's well within walking distance, just right across the street.",
      pedagogicalKey: 'Sử dụng "well within walking distance" tạo âm hưởng tự tin, chuyên nghiệp.',
    },
  },
  {
    day: 4,
    month: 1,
    titleEn: 'Smart Grocery & Specialty Shopping',
    titleVi: 'Mua sắm Siêu thị & Chọn Thực phẩm Tốt cho Sức khỏe',
    theme: 'Healthy Family Living & Practical Inquiries',
    cefrFocus: 'A2 → B1',
    scenarioDescription:
      'Bạn đang chọn mua thực phẩm hữu cơ và đồ dùng cho gia đình tại một siêu thị lớn. Bạn cần hỏi nhân viên quầy hàng và kiểm tra hạn sử dụng.',
    aiPersonaRole: 'Clara - Nhân viên Quản lý Quầy Thực phẩm',
    userRole: 'Khách hàng tìm mua thực phẩm ít đường cho gia đình',
    roleplayGoal: 'Hỏi vị trí quầy hàng lịch sự, kiểm tra tình trạng còn hàng và thanh toán.',
    initialAiGreeting: {
      en: 'Hi there! Can I help you find anything specific today, or are you just browsing?',
      vi: 'Chào bạn! Hôm nay tôi có thể giúp bạn tìm món gì cụ thể không, hay bạn đang dạo xem qua thôi?',
      suggestedA2: 'Can you help me find the yogurt section, please?',
      suggestedB1: 'Hi! I was wondering if you could point me in the direction of the organic dairy aisle?',
    },
    chunks: [
      {
        phrase: 'point me in the direction of...',
        ipa: '/pɔɪnt mi ɪn ðə dəˈrɛkʃən ʌv/',
        meaningVi: 'Chỉ giúp tôi hướng đi tới quầy...',
        example: 'Could you point me in the direction of the imported coffee section?',
        exampleVi: 'Bạn có thể chỉ giúp tôi hướng tới quầy cà phê nhập khẩu được không?',
        collocationTip: 'Cách hỏi vô cùng lịch lãm, dùng được cả trong siêu thị lẫn tòa nhà văn phòng.',
      },
      {
        phrase: 'currently out of stock',
        ipa: '/ˈkɜːrəntli aʊt əv stɑːk/',
        meaningVi: 'Hiện đang tạm hết hàng',
        example: "I'm afraid this brand is currently out of stock.",
        exampleVi: 'Tôi e rằng nhãn hiệu này hiện đang tạm hết hàng rồi.',
        collocationTip: 'Thuật ngữ chuẩn trong cả mua sắm lẫn quản lý chuỗi cung ứng.',
      },
      {
        phrase: 'grab a few essentials',
        ipa: '/ɡræb ə fjuː ɪˈsɛnʃəlz/',
        meaningVi: 'Mua nhanh vài món đồ thiết yếu',
        example: 'I just need to grab a few essentials for dinner on my way home.',
        exampleVi: 'Tôi chỉ cần ghé mua nhanh vài món thiết yếu cho bữa tối trên đường về nhà.',
        collocationTip: 'Tự nhiên hơn rất nhiều so với "buy some important things".',
      },
    ],
    shadowingDrills: [
      {
        id: 'd4-s1',
        text: 'Could you point me in the direction of the organic produce?',
        translationVi: 'Bạn chỉ giúp tôi hướng tới quầy rau củ hữu cơ được không?',
        intonationTip: 'Giọng nhẹ nhàng, lịch sự, lên giọng ở "produce?".',
        linkingTip: 'Nối âm: point_me_in, direction_of.',
        speakerRole: 'Học viên (Giọng mẫu B1)',
      },
    ],
    bedtimeReflex: {
      scenarioVi: 'Thu ngân hỏi bạn: "Did you find everything you were looking for today?"',
      challengePromptEn: 'Say yes and mention you just needed to grab a few essentials.',
      sampleReflexA2: 'Yes, thank you. I bought everything I need.',
      sampleReflexB1: 'Yes, everything was easy to find! I just needed to grab a few essentials for the family.',
      pedagogicalKey: 'Tạo phản xạ giao tiếp thân thiện ở quầy thanh toán.',
    },
  },
  {
    day: 5,
    month: 1,
    titleEn: 'Work-Life Rhythm & Daily Energy Habits',
    titleVi: 'Nhịp sống Công việc – Gia đình & Thói quen Năng lượng',
    theme: 'Adult Lifestyle & Wellness Management',
    cefrFocus: 'A2 → B1',
    scenarioDescription:
      'Bạn trò chuyện với một đồng nghiệp quốc tế về cách giữ sức khỏe và cân bằng thời gian giữa công việc bận rộn và gia đình ở độ tuổi 30–40.',
    aiPersonaRole: 'Emma - Chuyên gia Tư vấn Hiệu suất & Sức khỏe',
    userRole: 'Người đi làm bận rộn chia sẻ thói quen buổi sáng và buổi tối',
    roleplayGoal: 'Mô tả nhịp sinh hoạt hàng ngày bằng các cụm từ chỉ tần suất và trạng thái năng lượng tự nhiên.',
    initialAiGreeting: {
      en: "With such a busy work schedule, how do you manage to keep your energy up throughout the week?",
      vi: 'Với lịch làm việc bận rộn như vậy, làm thế nào bạn duy trì được nguồn năng lượng suốt cả tuần?',
      suggestedA2: 'I try to wake up early, exercise, and sleep on time.',
      suggestedB1:
        "To be honest, I'm an early riser! I try to work out on a regular basis and wind down without screens at night.",
    },
    chunks: [
      {
        phrase: 'an early riser / a night owl',
        ipa: '/ən ˈɜːrli ˈraɪzər/',
        meaningVi: 'Người hay dậy sớm / Người hay thức khuya làm việc',
        example: 'I used to be a night owl, but having kids turned me into an early riser.',
        exampleVi: 'Trước đây tôi hay thức khuya, nhưng từ khi có con tôi đã thành người dậy sớm.',
        collocationTip: 'Cách miêu tả bản thân rất giàu hình ảnh.',
      },
      {
        phrase: 'wind down in the evening',
        ipa: '/waɪnd daʊn ɪn ði ˈiːvnɪŋ/',
        meaningVi: 'Thư giãn, thả lỏng đầu óc vào buổi tối',
        example: 'Reading a good book helps me wind down after a hectic workday.',
        exampleVi: 'Đọc một cuốn sách hay giúp tôi thư giãn đầu óc sau một ngày làm việc quay cuồng.',
        collocationTip: 'Thay thế đắt giá cho từ "relax" thông thường.',
      },
      {
        phrase: 'on a regular basis',
        ipa: '/ɑːn ə ˈrɛɡjələr ˈbeɪsɪs/',
        meaningVi: 'Một cách đều đặn, thường xuyên',
        example: 'We review our safety and quality protocols on a regular basis.',
        exampleVi: 'Chúng tôi rà soát quy trình an toàn và chất lượng một cách đều đặn.',
        collocationTip: 'Dùng rất sang trong cả đời sống lẫn báo cáo công việc.',
      },
    ],
    shadowingDrills: [
      {
        id: 'd5-s1',
        text: 'By the end of the day, I love to wind down and spend quality time with my family.',
        translationVi: 'Vào cuối ngày, tôi thích thư giãn đầu óc và dành thời gian chất lượng bên gia đình.',
        intonationTip: 'Nhấn giọng ấm áp ở "wind down" và "quality time".',
        linkingTip: 'Nối âm: end_of_the_day.',
        speakerRole: 'Học viên (Giọng mẫu B1)',
      },
    ],
    bedtimeReflex: {
      scenarioVi: 'Đối tác hỏi bạn: "How do you usually recharge after a stressful project?"',
      challengePromptEn: 'Respond using "wind down" and "quality time".',
      sampleReflexA2: 'I usually relax at home with my family.',
      sampleReflexB1: 'I usually disconnect from emails to wind down and spend quality time with my family.',
      pedagogicalKey: 'Kết hợp từ vựng công sở và gia đình mượt mà.',
    },
  },
  {
    day: 6,
    month: 1,
    titleEn: 'Hosting a Business Dinner & Dietary Preferences',
    titleVi: 'Tiếp đãi Đối tác Ăn tối & Lưu ý Thực đơn Tinh tế',
    theme: 'Hospitality & Dining Etiquette',
    cefrFocus: 'A2 → B1',
    scenarioDescription:
      'Bạn đang dùng bữa tối cùng đối tác tại một nhà hàng hải sản cao cấp. Bạn cần hỏi món đặc trưng của bếp trưởng và lưu ý dị ứng thực phẩm.',
    aiPersonaRole: 'Marco - Quản lý Nhà hàng Âu',
    userRole: 'Chủ tiệc gọi món và chăm sóc thực đơn cho bàn tiệc',
    roleplayGoal: 'Hỏi món đặc sản trong ngày, yêu cầu để sốt riêng và đề nghị thanh toán lịch sự.',
    initialAiGreeting: {
      en: 'Good evening! Welcome to Harbor View. Would you like to start with some drinks while you look over the menu?',
      vi: 'Chào buổi tối! Chào mừng quý khách đến với Harbor View. Quý khách có muốn dùng đồ uống trước trong lúc xem thực đơn không ạ?',
      suggestedA2: 'Yes, sparkling water please. What is the best dish tonight?',
      suggestedB1:
        "Good evening! We'll start with sparkling water for the table, and could you tell us about tonight's catch of the day?",
    },
    chunks: [
      {
        phrase: 'catch of the day / house special',
        ipa: '/kætʃ əv ðə deɪ/',
        meaningVi: 'Món hải sản tươi nhất trong ngày / Món đặc trưng của quán',
        example: 'What is the chef recommending for the catch of the day?',
        exampleVi: 'Bếp trưởng gợi ý món hải sản tươi nào trong ngày hôm nay vậy?',
        collocationTip: 'Câu hỏi thể hiện sự sành điệu khi đi nhà hàng quốc tế.',
      },
      {
        phrase: 'have the dressing on the side',
        ipa: '/hæv ðə ˈdrɛsɪŋ ɑːn ðə saɪd/',
        meaningVi: 'Để riêng phần nước sốt ra đĩa/chén nhỏ',
        example: 'Could I have the salad with the dressing on the side, please?',
        exampleVi: 'Cho tôi phần salad nhưng để nước sốt riêng ra ngoài nhé.',
        collocationTip: 'Cụm "on the side" cực kỳ hữu dụng khi gọi món.',
      },
      {
        phrase: 'This one is on me / our treat',
        ipa: '/ðɪs wʌn ɪz ɑːn miː/',
        meaningVi: 'Bữa này để tôi mời / Công ty chúng tôi mời',
        example: 'Please put your card away—dinner tonight is on us!',
        exampleVi: 'Xin hãy cất thẻ đi—bữa tối nay là chúng tôi mời!',
        collocationTip: 'Văn hóa hiếu khách lịch thiệp của người Việt khi tiếp đối tác.',
      },
    ],
    shadowingDrills: [
      {
        id: 'd6-s1',
        text: 'Everything was delicious! Whenever you have a moment, could we get the check?',
        translationVi: 'Mọi món ăn đều rất tuyệt! Khi nào tiện, bạn cho chúng tôi xin hóa đơn nhé?',
        intonationTip: 'Nhấn mạnh sự hài lòng ở "delicious", nhẹ nhàng lịch sự ở "could we get the check?".',
        linkingTip: 'Nối âm: have_a_moment.',
        speakerRole: 'Học viên (Giọng mẫu B1)',
      },
    ],
    bedtimeReflex: {
      scenarioVi: 'Đối tác định rút ví trả tiền bữa tối nhưng bạn muốn chủ động mời.',
      challengePromptEn: 'Politely insist on paying using "This one is on me".',
      sampleReflexA2: 'No, I will pay for this dinner.',
      sampleReflexB1: 'Please, put your wallet away! This one is on me—thank you for coming all this way.',
      pedagogicalKey: 'Giao tiếp bàn tiệc tự nhiên, ấm áp và trọng thị.',
    },
  },
  {
    day: 7,
    month: 1,
    titleEn: 'Week 1 Milestone & Friday Office Small Talk',
    titleVi: 'Tổng kết Tuần 1 & Nghệ thuật Trò chuyện Xã giao Công sở',
    theme: 'Active Recall & Workplace Rapport',
    cefrFocus: 'A2 → B1',
    scenarioDescription:
      'Chiều thứ Sáu tại sảnh thang máy văn phòng, bạn trò chuyện xã giao với một Giám đốc dự án người Anh về kế hoạch nghỉ ngơi cuối tuần.',
    aiPersonaRole: 'David - Giám đốc Dự án tại Văn phòng London',
    userRole: 'Đồng nghiệp trò chuyện cởi mở tạo thiện cảm cuối tuần',
    roleplayGoal: 'Tương tác tự nhiên về tuần làm việc bận rộn và chia sẻ kế hoạch cuối tuần cùng gia đình.',
    initialAiGreeting: {
      en: "Thank goodness it's Friday! It has been quite a week. Do you have anything fun lined up for the weekend?",
      vi: 'Ơn trời thứ Sáu đây rồi! Một tuần bận rộn thật sự. Bạn đã lên kế hoạch thú vị nào cho cuối tuần chưa?',
      suggestedA2: 'Yes, I will stay home and rest with my wife and kids.',
      suggestedB1:
        "Tell me about it! I'm planning to keep it low-key and catch up on some quality time with my family.",
    },
    chunks: [
      {
        phrase: 'tell me about it!',
        ipa: '/tɛl mi əˈbaʊt ɪt/',
        meaningVi: 'Chuẩn luôn! / Tôi hoàn toàn đồng cảm với bạn!',
        example: 'The project schedule was so tight this week! — Tell me about it!',
        exampleVi: 'Tiến độ dự án tuần này căng thật sự! — Chuẩn luôn, tôi cũng thấy vậy!',
        collocationTip: 'Dùng để bày tỏ sự đồng cảm tức thì, không phải bảo người kia kể chuyện.',
      },
      {
        phrase: 'keep it low-key',
        ipa: '/kiːp ɪt ˈloʊˈkiː/',
        meaningVi: 'Nghỉ ngơi nhẹ nhàng, kín đáo, không ồn ào',
        example: "We're just going to keep it low-key this weekend and cook at home.",
        exampleVi: 'Cuối tuần này gia đình mình chỉ định nghỉ ngơi nhẹ nhàng và nấu ăn ở nhà thôi.',
        collocationTip: 'Cụm từ cực kỳ phổ biến của giới văn phòng quốc tế.',
      },
      {
        phrase: 'have something lined up',
        ipa: '/hæv ˈsʌmθɪŋ laɪnd ʌp/',
        meaningVi: 'Đã lên lịch / sắp xếp kế hoạch sẵn',
        example: 'Do you have any meetings lined up for Monday morning?',
        exampleVi: 'Sáng thứ Hai tới bạn có lịch họp nào được xếp sẵn chưa?',
        collocationTip: 'Chuyên nghiệp hơn nhiều so với "Do you have plans?".',
      },
    ],
    shadowingDrills: [
      {
        id: 'd7-s1',
        text: "Tell me about it! I'm just going to keep it low-key and recharge my batteries.",
        translationVi: 'Công nhận! Tôi chỉ định nghỉ ngơi nhẹ nhàng để nạp lại năng lượng thôi.',
        intonationTip: 'Nhấn cảm xúc đồng điệu ở "Tell me about it!".',
        linkingTip: 'Nối âm: keep_it_low-key.',
        speakerRole: 'Học viên (Giọng mẫu B1)',
      },
    ],
    bedtimeReflex: {
      scenarioVi: 'Sếp hỏi bạn lúc tan làm chiều thứ Sáu: "Got any big plans for the weekend?"',
      challengePromptEn: 'Respond using "keep it low-key".',
      sampleReflexA2: 'Nothing big, just staying home with my family.',
      sampleReflexB1: "Nothing too crazy! I'm just going to keep it low-key and take my kids to the park.",
      pedagogicalKey: 'Xây dựng thiện cảm (rapport) tự nhiên với cấp trên và đồng nghiệp.',
    },
  },
  {
    day: 8,
    month: 1,
    titleEn: 'Metro Systems & High-Speed Rail Transit',
    titleVi: 'Di chuyển Tàu điện & Tàu cao tốc khi Công tác',
    theme: 'International Commuting & Logistics',
    cefrFocus: 'A2 → B1',
    scenarioDescription:
      'Bạn đang ở nhà ga trung tâm để mua thẻ đi tàu và hỏi tuyến chuyển tàu nhanh nhất tới khu công nghiệp.',
    aiPersonaRole: 'Kenji - Nhân viên Hỗ trợ Ga Tàu Cao tốc',
    userRole: 'Khách công tác cần nạp thẻ tàu và hỏi ga chuyển tuyến',
    roleplayGoal: 'Hỏi cách nạp tiền vào thẻ từ, xác nhận ga chuyển tuyến (transfer) và giờ tàu chạy.',
    initialAiGreeting: {
      en: 'Good morning! Can I help you with the ticket machine? The express lines can be a bit confusing.',
      vi: 'Chào buổi sáng! Tôi có thể hỗ trợ bạn ở máy bán vé không? Các tuyến tàu nhanh đôi khi hơi rối một chút.',
      suggestedA2: 'Yes, please! How can I go to the Industrial Park station?',
      suggestedB1:
        "Thanks so much! I'm trying to top up my transit card and figure out where to transfer for the Industrial Park.",
    },
    chunks: [
      {
        phrase: 'top up my transit card',
        ipa: '/tɑːp ʌp maɪ ˈtrænzɪt kɑːrd/',
        meaningVi: 'Nạp thêm tiền vào thẻ đi tàu/xe',
        example: 'Where can I top up my transit card with a credit card?',
        exampleVi: 'Tôi có thể nạp tiền vào thẻ đi tàu bằng thẻ tín dụng ở đâu?',
        collocationTip: 'Dùng "top up" cho cả thẻ tàu, ví điện tử và điện thoại.',
      },
      {
        phrase: 'transfer at the next station',
        ipa: '/trænsˈfɜːr æt ðə nɛkst ˈsteɪʃən/',
        meaningVi: 'Chuyển tuyến ở ga kế tiếp',
        example: 'You need to transfer to the Green Line at the next station.',
        exampleVi: 'Bạn cần chuyển sang tuyến Màu Xanh ở ga kế tiếp nhé.',
        collocationTip: 'Từ khóa cốt lõi khi di chuyển bằng hệ thống Metro quốc tế.',
      },
      {
        phrase: 'avoid the rush hour',
        ipa: '/əˈvɔɪd ðə rʌʃ ˈaʊər/',
        meaningVi: 'Tránh khung giờ cao điểm kẹt xe/đông đúc',
        example: 'We should leave before 4 PM to avoid the evening rush hour.',
        exampleVi: 'Chúng ta nên xuất phát trước 4 giờ chiều để tránh giờ cao điểm buổi tối.',
        collocationTip: 'Rất thực tế khi sắp xếp lịch trình di chuyển.',
      },
    ],
    shadowingDrills: [
      {
        id: 'd8-s1',
        text: 'Do I need to transfer anywhere, or does this train go straight there?',
        translationVi: 'Tôi có cần chuyển tàu ở đâu không, hay chuyến này chạy thẳng tới đó?',
        intonationTip: 'Lên giọng ở "transfer anywhere", hạ giọng ở "straight there".',
        linkingTip: 'Nối âm: need_to, go_straight.',
        speakerRole: 'Học viên (Giọng mẫu B1)',
      },
    ],
    bedtimeReflex: {
      scenarioVi: 'Đồng nghiệp hỏi: "Should we take a taxi or the metro to the client\'s office?"',
      challengePromptEn: 'Suggest taking the metro to avoid the rush hour.',
      sampleReflexA2: 'Let us take the metro because the road is busy.',
      sampleReflexB1: "Let's definitely take the metro so we can avoid the morning rush hour!",
      pedagogicalKey: 'Đưa ra đề xuất hợp lý kèm lý do ngắn gọn.',
    },
  },
  {
    day: 9,
    month: 1,
    titleEn: 'Hotel Check-In, Room Upgrades & Late Check-Out',
    titleVi: 'Nhận phòng Khách sạn, Đổi phòng Yên tĩnh & Trả phòng Muộn',
    theme: 'Business Hospitality & Executive Comfort',
    cefrFocus: 'A2 → B1',
    scenarioDescription:
      'Sau chuyến bay dài, bạn làm thủ tục nhận phòng khách sạn. Bạn muốn xin một phòng tầng cao yên tĩnh để làm việc và hỏi về việc trả phòng muộn.',
    aiPersonaRole: 'Sophia - Trưởng bộ phận Lễ tân Khách sạn 5 sao',
    userRole: 'Khách lưu trú công tác làm thủ tục nhận phòng',
    roleplayGoal: 'Xác nhận đặt phòng, đề nghị phòng tầng cao yên tĩnh và hỏi giờ ăn sáng.',
    initialAiGreeting: {
      en: 'Welcome to Grand Marina Hotel! May I have your name and passport to look up your reservation?',
      vi: 'Chào mừng quý khách đến với Grand Marina Hotel! Cho phép tôi xin tên và hộ chiếu để kiểm tra thông tin đặt phòng ạ?',
      suggestedA2: 'Here is my passport. My booking is under my name.',
      suggestedB1:
        'Good afternoon! The reservation is under my name. Here is my passport—by the way, would it be possible to get a quiet room on a higher floor?',
    },
    chunks: [
      {
        phrase: 'reservation is under the name of...',
        ipa: '/ˌrɛzərˈveɪʃən ɪz ˈʌndər ðə neɪm ʌv/',
        meaningVi: 'Đặt phòng dưới tên của...',
        example: 'Our corporate reservation is under the name of Nguyen.',
        exampleVi: 'Đặt phòng công ty của chúng tôi đứng tên Nguyễn.',
        collocationTip: 'Cấu trúc chuẩn mực tại mọi quầy lễ tân khách sạn và nhà hàng.',
      },
      {
        phrase: 'request a late check-out',
        ipa: '/rɪˈkwɛst ə leɪt ˈtʃɛkˌaʊt/',
        meaningVi: 'Xin trả phòng muộn hơn giờ quy định',
        example: 'Since my flight is in the evening, could I request a late check-out at 2 PM?',
        exampleVi: 'Vì chuyến bay của tôi vào buổi tối, tôi có thể xin trả phòng muộn lúc 2 giờ chiều được không?',
        collocationTip: 'Nêu lý do ngắn gọn trước khi đưa ra yêu cầu giúp tỷ lệ được duyệt cao hơn.',
      },
      {
        phrase: 'away from the elevator',
        ipa: '/əˈweɪ frʌm ði ˈɛləˌveɪtər/',
        meaningVi: 'Cách xa khu vực thang máy (để tránh tiếng ồn)',
        example: "I'm a light sleeper, so a room away from the elevator would be ideal.",
        exampleVi: 'Tôi khá nhạy cảm với tiếng động khi ngủ, nên một căn phòng xa thang máy sẽ rất lý tưởng.',
        collocationTip: 'Mẹo thực tế cho người đi công tác cần giấc ngủ sâu.',
      },
    ],
    shadowingDrills: [
      {
        id: 'd9-s1',
        text: 'Would it be possible to get a quiet room on a higher floor, away from the elevator?',
        translationVi: 'Liệu có thể sắp xếp cho tôi một phòng yên tĩnh ở tầng cao, xa thang máy được không?',
        intonationTip: 'Ngữ điệu trầm ấm, lịch thiệp của một vị khách chuyên nghiệp.',
        linkingTip: 'Nối âm: Would_it_be, get_a, on_a.',
        speakerRole: 'Học viên (Giọng mẫu B1)',
      },
    ],
    bedtimeReflex: {
      scenarioVi: 'Lễ tân hỏi bạn: "Is there anything else we can assist you with for your stay?"',
      challengePromptEn: 'Ask if breakfast is included and request a 2 PM late check-out.',
      sampleReflexA2: 'Is breakfast free? And can I check out at 2 PM?',
      sampleReflexB1:
        'Just one quick thing—could you confirm if breakfast is complimentary, and would a 2 PM late check-out be possible?',
      pedagogicalKey: 'Sử dụng "complimentary" (miễn phí đi kèm) thay cho "free" để tăng độ sang trọng.',
    },
  },
  {
    day: 10,
    month: 1,
    titleEn: 'Expressing Nuanced Opinions & Tactful Tastes',
    titleVi: 'Bày tỏ Quan điểm Đa chiều & Từ chối Tinh tế',
    theme: 'Social Intelligence & Cultural Nuance',
    cefrFocus: 'A2 → B1',
    scenarioDescription:
      'Trong bữa trưa cùng đối tác nước ngoài, họ hỏi cảm nhận của bạn về một trào lưu công nghệ hoặc bộ phim đang nổi tiếng mà bạn không thực sự thích.',
    aiPersonaRole: 'Lucas - Đối tác Sáng tạo tại Sydney',
    userRole: 'Chuyên gia chia sẻ góc nhìn cá nhân một cách lịch thiệp',
    roleplayGoal: 'Diễn đạt sự yêu thích hoặc không hợp gu bằng các cụm từ tinh tế thay vì chê bai trực diện.',
    initialAiGreeting: {
      en: 'Everyone in our office has been raving about that new documentary series! Have you had a chance to watch it yet?',
      vi: 'Mọi người trong văn phòng tôi đều đang khen nức nở bộ phim tài liệu mới đó! Bạn đã có dịp xem thử chưa?',
      suggestedA2: 'I watched one episode, but I did not like it very much.',
      suggestedB1:
        "I did catch the first episode last weekend! To be fair, the visuals were great, though the pacing wasn't really my cup of tea.",
    },
    chunks: [
      {
        phrase: 'not really my cup of tea',
        ipa: '/nɑːt ˈrɪəli maɪ kʌp əv tiː/',
        meaningVi: 'Không hẳn là gu / sở thích của tôi',
        example: 'Golf is great for networking, but to be honest, it is not really my cup of tea.',
        exampleVi: 'Chơi golf rất tốt để mở rộng quan hệ, nhưng thành thật thì đó không hẳn là gu của tôi.',
        collocationTip: 'Cách nói giảm nói tránh cực kỳ lịch sự thay cho "I don\'t like it".',
      },
      {
        phrase: 'rave about something',
        ipa: '/reɪv əˈbaʊt ˈsʌmθɪŋ/',
        meaningVi: 'Khen ngợi hết lời / Hào hứng bàn tán về điều gì',
        example: 'Our clients have been raving about the reliability of the new system.',
        exampleVi: 'Khách hàng của chúng ta đang khen ngợi hết lời về độ ổn định của hệ thống mới.',
        collocationTip: 'Từ vựng B1+ giúp câu chuyện sinh động hơn hẳn.',
      },
      {
        phrase: 'it really grew on me',
        ipa: '/ɪt ˈrɪəli ɡruː ɑːn miː/',
        meaningVi: 'Lúc đầu chưa quen nhưng càng về sau càng thấy thích',
        example: 'The new software interface felt complex at first, but it really grew on me.',
        exampleVi: 'Giao diện phần mềm mới lúc đầu có vẻ phức tạp, nhưng dùng dần tôi lại rất thích.',
        collocationTip: 'Diễn tả sự thay đổi cảm nhận theo thời gian rất tự nhiên.',
      },
    ],
    shadowingDrills: [
      {
        id: 'd10-s1',
        text: "It wasn't my cup of tea at first, but after a few days, it really grew on me.",
        translationVi: 'Lúc đầu nó không phải gu của tôi, nhưng sau vài ngày thì tôi lại thực sự thích nó.',
        intonationTip: 'Nhấn sự đối lập thú vị giữa "cup of tea" và "grew on me".',
        linkingTip: 'Nối âm: cup_of, grew_on_me.',
        speakerRole: 'Học viên (Giọng mẫu B1)',
      },
    ],
    bedtimeReflex: {
      scenarioVi: 'Đồng nghiệp rủ bạn đi nghe nhạc Rock nặng (Heavy Metal) vào tối thứ Sáu.',
      challengePromptEn: 'Decline warmly using "not really my cup of tea" and suggest grabbing coffee instead.',
      sampleReflexA2: 'No thanks, I do not like rock music. Let us drink coffee.',
      sampleReflexB1:
        "Thanks so much for the invite! Heavy rock isn't really my cup of tea, but I'd love to catch up over coffee tomorrow!",
      pedagogicalKey: 'Từ chối khéo léo mà vẫn giữ trọn tình cảm đồng nghiệp.',
    },
  },
  {
    day: 31,
    month: 2,
    titleEn: 'Leading International Video Calls & Technical Check',
    titleVi: 'Chủ trì Họp Trực tuyến Quốc tế & Kiểm tra Kết nối',
    theme: 'Cross-Border Remote Leadership',
    cefrFocus: 'B1',
    scenarioDescription:
      'Bạn là người điều phối cuộc họp trực tuyến với đội ngũ kỹ thuật và quản lý dự án tại châu Âu. Bạn cần kiểm tra âm thanh, chia sẻ màn hình và đi vào nội dung chính.',
    aiPersonaRole: 'Sarah - Giám đốc Dự án Khu vực tại Frankfurt',
    userRole: 'Quản lý/Chuyên gia tại Việt Nam chủ trì cuộc họp',
    roleplayGoal: 'Chào hỏi chuyên nghiệp, xác nhận tín hiệu âm thanh/màn hình và dẫn dắt vào chương trình nghị sự (agenda).',
    initialAiGreeting: {
      en: 'Good afternoon Vietnam time, and morning from Frankfurt! Can everyone hear and see me loud and clear?',
      vi: 'Chào buổi chiều theo giờ Việt Nam và chào buổi sáng từ Frankfurt! Mọi người có nghe và thấy tôi rõ ràng không ạ?',
      suggestedA2: 'Yes, Sarah! We can hear you and see you clearly. Let us start.',
      suggestedB1:
        "Loud and clear, Sarah! Great to see you. Since everyone is on the call, shall we dive right into today's agenda?",
    },
    chunks: [
      {
        phrase: 'coming through loud and clear',
        ipa: '/ˈkʌmɪŋ θruː laʊd ænd klɪr/',
        meaningVi: 'Nghe rất to và rõ ràng (tín hiệu tốt)',
        example: 'Your audio is coming through loud and clear on our end.',
        exampleVi: 'Âm thanh của bạn truyền tới phía chúng tôi rất to và rõ ràng.',
        collocationTip: 'Câu xác nhận tín hiệu chuyên nghiệp nhất trong các cuộc họp Teams/Zoom.',
      },
      {
        phrase: 'dive right into the agenda',
        ipa: '/daɪv raɪt ˈɪntu ði əˈdʒɛndə/',
        meaningVi: 'Đi thẳng vào nội dung chính của cuộc họp',
        example: "Since we're on a tight schedule, let's dive right into today's agenda.",
        exampleVi: 'Vì lịch trình của chúng ta khá sát, hãy đi thẳng vào nội dung chính hôm nay nhé.',
        collocationTip: 'Thể hiện phong thái làm việc quyết đoán, tôn trọng thời gian của người tham dự.',
      },
      {
        phrase: 'you were cutting out for a second',
        ipa: '/juː wɜːr ˈkʌtɪŋ aʊt fɔːr ə ˈsɛkənd/',
        meaningVi: 'Tiếng của bạn vừa bị giật/mất tiếng một chút',
        example: 'Sorry Sarah, you were cutting out for a second—could you repeat that last point?',
        exampleVi: 'Xin lỗi Sarah, tiếng của bạn vừa bị ngắt quãng một chút—bạn nhắc lại ý vừa rồi được không?',
        collocationTip: 'Xử lý sự cố mạng cực kỳ tự nhiên.',
      },
    ],
    shadowingDrills: [
      {
        id: 'd31-s1',
        text: "You're coming through loud and clear! Let's dive right into today's agenda.",
        translationVi: 'Nghe bạn rất to và rõ! Hãy bắt tay ngay vào nội dung cuộc họp hôm nay nhé.',
        intonationTip: 'Giọng đĩnh đạc, dứt khoát của người điều phối cuộc họp.',
        linkingTip: 'Nối âm: loud_and_clear, dive_right_into.',
        speakerRole: 'Học viên (Giọng mẫu B1)',
      },
    ],
    bedtimeReflex: {
      scenarioVi: 'Trong lúc đối tác đang trình bày trên Zoom thì mạng bị giật khiến bạn không nghe rõ câu chốt.',
      challengePromptEn: 'Politely ask them to repeat using "cutting out for a second".',
      sampleReflexA2: 'Sorry, the internet was bad. Can you say that again?',
      sampleReflexB1:
        'My apologies! Your audio was cutting out for a quick second there—could you run that last part by me again?',
      pedagogicalKey: 'Làm chủ hoàn toàn các tình huống kỹ thuật trong phòng họp ảo.',
    },
  },
  {
    day: 45,
    month: 2,
    titleEn: 'Managing Project Delays & Risk Mitigation',
    titleVi: 'Xử lý Chậm Tiến độ & Đề xuất Phương án Khắc phục Rủi ro',
    theme: 'Engineering & Project Accountability',
    cefrFocus: 'B1',
    scenarioDescription:
      'Một hạng mục kỹ thuật phát sinh lỗi ngoài dự kiến khiến tiến độ bàn giao cần lùi lại 48 giờ để đảm bảo tiêu chuẩn an toàn. Bạn chủ động báo cáo với Giám đốc điều hành.',
    aiPersonaRole: 'Marcus - Giám đốc Kỹ thuật & Vận hành (Operations Director)',
    userRole: 'Trưởng nhóm phụ trách báo cáo tiến độ và giải pháp',
    roleplayGoal: 'Thông báo sự cố minh bạch, nhấn mạnh tiêu chuẩn an toàn/chất lượng và cam kết mốc thời gian mới.',
    initialAiGreeting: {
      en: 'Hey! I saw your note flagging a potential delay on the phase-two handover. What is the current status on the ground?',
      vi: 'Chào bạn! Tôi vừa thấy thông báo của bạn về nguy cơ chậm bàn giao giai đoạn 2. Tình hình thực tế tại hiện trường đang thế nào?',
      suggestedA2: 'We found a technical problem, so we need two more days to check everything safely.',
      suggestedB1:
        "We ran into an unexpected technical hiccup during inspection. To make sure safety and quality aren't compromised, we need to push back the handover by 48 hours.",
    },
    chunks: [
      {
        phrase: 'run into an unexpected hiccup',
        ipa: '/rʌn ˈɪntu ən ˌʌnɪkˈspɛktɪd ˈhɪkʌp/',
        meaningVi: 'Gặp phải một trục trặc nhỏ ngoài dự kiến',
        example: 'We ran into a slight hiccup with the equipment calibration.',
        exampleVi: 'Chúng tôi gặp một trục trặc nhỏ trong khâu hiệu chuẩn thiết bị.',
        collocationTip: 'Từ "hiccup" giúp giảm nhẹ căng thẳng nhưng vẫn phản ánh đúng bản chất vấn đề.',
      },
      {
        phrase: 'make sure safety is not compromised',
        ipa: '/meɪk ʃʊr ˈseɪfti ɪz nɑːt ˈkɑːmprəˌmaɪzd/',
        meaningVi: 'Đảm bảo tiêu chuẩn an toàn tuyệt đối không bị ảnh hưởng',
        example: 'We paused the lifting operation to make sure safety is not compromised.',
        exampleVi: 'Chúng tôi đã tạm dừng ca cẩu lắp để đảm bảo an toàn không bị xâm phạm.',
        collocationTip: 'Cụm từ vàng trong ngành kỹ thuật, sản xuất và quản lý dự án.',
      },
      {
        phrase: 'keep you in the loop',
        ipa: '/kiːp juː ɪn ðə luːp/',
        meaningVi: 'Cập nhật thông tin sát sao cho bạn nắm',
        example: "I'll monitor the repair closely and keep you in the loop every step of the way.",
        exampleVi: 'Tôi sẽ giám sát chặt chẽ quá trình khắc phục và cập nhật sát sao cho anh ở từng bước.',
        collocationTip: 'Tạo sự an tâm tuyệt đối cho cấp trên và khách hàng.',
      },
    ],
    shadowingDrills: [
      {
        id: 'd45-s1',
        text: "To make sure safety isn't compromised, we've implemented a backup plan and will keep you in the loop.",
        translationVi: 'Để đảm bảo an toàn không bị ảnh hưởng, chúng tôi đã triển khai phương án dự phòng và sẽ cập nhật sát sao cho ngài.',
        intonationTip: 'Giọng trầm tĩnh, trách nhiệm, nhấn mạnh ở "safety" và "backup plan".',
        linkingTip: 'Nối âm: make_sure, keep_you_in.',
        speakerRole: 'Học viên (Giọng mẫu B1)',
      },
    ],
    bedtimeReflex: {
      scenarioVi: 'Khách hàng lo lắng hỏi: "When will we know if the issue is fully resolved?"',
      challengePromptEn: 'Reassure them using "keep you in the loop" and promise an update by tomorrow morning.',
      sampleReflexA2: 'I will tell you tomorrow morning as soon as we finish.',
      sampleReflexB1:
        "Our team is on it right now. I'll personally keep you in the loop and send a full update first thing tomorrow morning.",
      pedagogicalKey: 'Phong thái làm chủ khủng hoảng (Crisis Management) bằng tiếng Anh.',
    },
  },
  {
    day: 61,
    month: 3,
    titleEn: 'Compelling Business Storytelling & Lessons Learned',
    titleVi: 'Nghệ thuật Kể chuyện Chuyên nghiệp & Chia sẻ Bài học Thực chiến',
    theme: 'Executive Presence & Narrative Impact',
    cefrFocus: 'B1 → B1+',
    scenarioDescription:
      'Trong buổi tiệc tối cùng các đối tác nước ngoài, mọi người đang chia sẻ về kỷ niệm hoặc thử thách đáng nhớ nhất trong sự nghiệp của mình.',
    aiPersonaRole: 'Chloe - Giám đốc Đối ngoại Quốc tế',
    userRole: 'Chuyên gia kể lại một câu chuyện vượt khó đầy cuốn hút',
    roleplayGoal: 'Sử dụng các cụm từ tạo kịch tính và đúc kết câu chuyện gọn gàng, lôi cuốn.',
    initialAiGreeting: {
      en: 'Someone mentioned you once managed a super challenging project under extreme weather conditions! What actually happened back then?',
      vi: 'Có người kể với tôi rằng bạn từng chỉ huy một dự án cực kỳ thử thách dưới điều kiện thời tiết khắc nghiệt! Chuyện gì đã thực sự diễn ra lúc đó vậy?',
      suggestedA2: 'Yes, it was a very difficult week because of a big storm, but our team finished the work safely.',
      suggestedB1:
        'Oh, where do I even begin? Picture this: we were 48 hours away from the deadline, and out of nowhere, a massive storm hit the coast!',
    },
    chunks: [
      {
        phrase: 'out of nowhere',
        ipa: '/aʊt əv ˈnoʊˌwɛr/',
        meaningVi: 'Bỗng nhiên / Bất thình lình không báo trước',
        example: 'Out of nowhere, the main power generator went offline.',
        exampleVi: 'Bất thình lình, máy phát điện chính bị ngắt kết nối.',
        collocationTip: 'Tạo điểm nhấn cao trào cực kỳ hiệu quả khi kể chuyện.',
      },
      {
        phrase: 'to make matters worse',
        ipa: '/tə meɪk ˈmætərz wɜːrs/',
        meaningVi: 'Tệ hơn nữa là / Khó khăn chồng chất khó khăn',
        example: 'It was pouring rain, and to make matters worse, our supply vessel was delayed.',
        exampleVi: 'Trời mưa như trút nước, và tệ hơn nữa là tàu tiếp vận của chúng tôi bị trễ.',
        collocationTip: 'Cụm nối nâng tầm khả năng kể chuyện lên chuẩn B1+.',
      },
      {
        phrase: 'long story short',
        ipa: '/lɔːŋ ˈstɔːri ʃɔːrt/',
        meaningVi: 'Tóm lại là / Nói ngắn gọn lại thì',
        example: 'Long story short, the team pulled together and delivered the project with zero accidents.',
        exampleVi: 'Tóm lại là cả đội đã đồng lòng vượt qua và bàn giao dự án với không một tai nạn nào.',
        collocationTip: 'Giúp bạn khép lại câu chuyện đúng lúc, súc tích và ấn tượng.',
      },
    ],
    shadowingDrills: [
      {
        id: 'd61-s1',
        text: 'Long story short, what started as a major crisis turned into our proudest team achievement!',
        translationVi: 'Nói ngắn gọn lại, thứ bắt đầu như một cuộc khủng hoảng lớn đã trở thành thành tựu đáng tự hào nhất của cả đội!',
        intonationTip: 'Ngữ điệu truyền cảm hứng, nhấn mạnh "major crisis" và "proudest team achievement".',
        linkingTip: 'Nối âm: started_as_a, turned_into.',
        speakerRole: 'Học viên (Giọng mẫu B1+)',
      },
    ],
    bedtimeReflex: {
      scenarioVi: 'Đồng nghiệp hỏi: "How did you manage to pass that strict international audit?"',
      challengePromptEn: 'Summarize your success dynamically using "Long story short".',
      sampleReflexA2: 'We prepared carefully and passed the audit.',
      sampleReflexB1:
        'It was intense for two weeks, but long story short, our strict safety records spoke for themselves and we passed with flying colors!',
      pedagogicalKey: 'Khả năng tóm lược tình huống phức tạp thành thông điệp đắt giá.',
    },
  },
  {
    day: 75,
    month: 3,
    titleEn: 'Strategic Debate & Tactful Disagreement in Meetings',
    titleVi: 'Tranh biện Chiến lược & Phản biện Khéo léo trên Bàn họp',
    theme: 'High-Stakes Persuasion & Diplomatic Pushback',
    cefrFocus: 'B1 → B1+',
    scenarioDescription:
      'Trong cuộc họp hoạch định ngân sách, một thành viên ban quản trị muốn cắt giảm chi phí đào tạo và bảo trì định kỳ. Bạn cần phản biện lịch sự nhưng đanh thép để bảo vệ tiêu chuẩn dài hạn.',
    aiPersonaRole: 'Arthur - Cố vấn Tài chính Bảo thủ',
    userRole: 'Quản lý Cấp cao bảo vệ ngân sách an toàn và đào tạo nhân sự',
    roleplayGoal: 'Đồng cảm với áp lực chi phí của đối phương nhưng dùng số liệu và tầm nhìn dài hạn để thuyết phục ngược lại.',
    initialAiGreeting: {
      en: 'Looking at Q3 numbers, I strongly believe we should cut our training and preventive maintenance budget by 30% to boost short-term margins.',
      vi: 'Nhìn vào số liệu Quý 3, tôi cho rằng chúng ta nên cắt giảm 30% ngân sách đào tạo và bảo trì phòng ngừa để tăng biên lợi nhuận ngắn hạn.',
      suggestedA2: 'I understand your idea, but cutting safety training is dangerous for our company.',
      suggestedB1:
        "I see where you're coming from regarding Q3 margins, Arthur, but on the flip side, cutting preventive maintenance now could cost us ten times more in downtime later.",
    },
    chunks: [
      {
        phrase: "I see where you're coming from, but...",
        ipa: '/aɪ siː wɛr jʊr ˈkʌmɪŋ frʌm bʌt/',
        meaningVi: 'Tôi hoàn toàn hiểu góc nhìn của ông/bạn, tuy nhiên...',
        example: "I see where you're coming from on the timeline, but we cannot skip the safety inspection.",
        exampleVi: 'Tôi hiểu áp lực về tiến độ của anh, nhưng chúng ta không thể bỏ qua bước nghiệm thu an toàn.',
        collocationTip: 'Tuyệt chiêu phản biện của các nhà đàm phán quốc tế: công nhận trước, phản biện sau.',
      },
      {
        phrase: 'on the flip side',
        ipa: '/ɑːn ðə flɪp saɪd/',
        meaningVi: 'Ở chiều ngược lại / Nhìn vào mặt trái của vấn đề',
        example: 'It saves money today, but on the flip side, it increases operational risk.',
        exampleVi: 'Cách đó tiết kiệm tiền hôm nay, nhưng ở chiều ngược lại, nó làm tăng rủi ro vận hành.',
        collocationTip: 'Cụm từ chuyển ý sắc sảoระดับ B1+/B2.',
      },
      {
        phrase: 'find some common ground',
        ipa: '/faɪnd sʌm ˈkɑːmən ɡraʊnd/',
        meaningVi: 'Tìm ra tiếng nói chung / Giải pháp dung hòa',
        example: "I'm confident we can find some common ground that protects both our budget and our safety standards.",
        exampleVi: 'Tôi tin rằng chúng ta có thể tìm được giải pháp dung hòa giúp bảo vệ cả ngân sách lẫn tiêu chuẩn an toàn.',
        collocationTip: 'Hướng cuộc tranh luận về kết quả Win-Win.',
      },
    ],
    shadowingDrills: [
      {
        id: 'd75-s1',
        text: "I see where you're coming from, but in the long run, preventive maintenance saves us far more money.",
        translationVi: 'Tôi hiểu góc nhìn của ngài, nhưng về lâu dài, bảo trì phòng ngừa giúp chúng ta tiết kiệm nhiều tiền hơn thế.',
        intonationTip: 'Giọng điềm đạm, chắc chắn, nhấn vào "in the long run" và "far more money".',
        linkingTip: 'Nối âm: where_you\'re, in_the_long_run.',
        speakerRole: 'Học viên (Giọng mẫu B1+)',
      },
    ],
    bedtimeReflex: {
      scenarioVi: 'Đối tác nói: "Let\'s skip the trial run and launch the system immediately to save time."',
      challengePromptEn: 'Push back diplomatically using "I see where you\'re coming from, but...".',
      sampleReflexA2: 'I understand, but we must test the system first.',
      sampleReflexB1:
        "I see where you're coming from since time is tight, but running a quick 24-hour trial will save us from costly disruptions later.",
      pedagogicalKey: 'Bản lĩnh phản biện không gây mất lòng của người quản lý.',
    },
  },
  {
    day: 90,
    month: 3,
    titleEn: 'The 90-Day Executive Graduation: Spontaneous Fluency',
    titleVi: 'Lễ Tốt Nghiệp 90 Ngày: Làm chủ Phản xạ Giao tiếp Quốc tế',
    theme: 'Capstone Reflex Mastery & Leadership Vision',
    cefrFocus: 'B1 → B1+',
    scenarioDescription:
      'Buổi phỏng vấn vinh danh và tổng kết hành trình 90 ngày rèn luyện phản xạ cùng Giáo sư SLA. Bạn tự tin nhìn lại sự lột xác của bản thân và chia sẻ tầm nhìn sự nghiệp mới.',
    aiPersonaRole: 'Giáo sư Henderson - Chủ tịch Hội đồng Ngôn ngữ Ứng dụng SLA',
    userRole: 'Học viên tốt nghiệp cấp độ B1+ với phản xạ tự nhiên',
    roleplayGoal: 'Trò chuyện tự nhiên không cần kịch bản, đúc kết hành trình kỷ luật 90 ngày và định hướng tương lai.',
    initialAiGreeting: {
      en: 'Congratulations on reaching Day 90! Looking back from Day 1 to right now, how has your speaking confidence transformed both at work and in life?',
      vi: 'Chúc mừng bạn đã cán đích Ngày 90! Nhìn lại từ Ngày 1 đến khoảnh khắc này, sự tự tin và phản xạ nói tiếng Anh của bạn trong công việc và cuộc sống đã thay đổi như thế nào?',
      suggestedA2: 'Thank you Professor! Now I can speak English naturally at work without fear.',
      suggestedB1:
        'Honestly, Professor, this 90-day journey has been an absolute game changer! I no longer translate word-for-word in my head, and speaking up in international meetings has become second nature to me.',
    },
    chunks: [
      {
        phrase: 'an absolute game changer',
        ipa: '/æn ˈæbsəluːt ɡeɪm ˈtʃeɪndʒər/',
        meaningVi: 'Một bước ngoặt thay đổi hoàn toàn cục diện',
        example: 'Building a daily speaking habit was an absolute game changer for my career.',
        exampleVi: 'Xây dựng thói quen luyện nói mỗi ngày là một bước ngoặt thay đổi hoàn toàn sự nghiệp của tôi.',
        collocationTip: 'Cụm danh từ giàu năng lượng tích cực để đánh giá một giải pháp đột phá.',
      },
      {
        phrase: 'become second nature',
        ipa: '/bɪˈkʌm ˈsɛkənd ˈneɪtʃər/',
        meaningVi: 'Trở thành phản xạ tự nhiên như hơi thở',
        example: 'Following strict safety protocols and speaking English daily have both become second nature to me.',
        exampleVi: 'Tuân thủ quy trình an toàn nghiêm ngặt và nói tiếng Anh mỗi ngày đều đã trở thành bản năng thứ hai của tôi.',
        collocationTip: 'Đích đến cao nhất của phương pháp SLA Krashen i+1.',
      },
      {
        phrase: 'come a long way',
        ipa: '/kʌm ə lɔːŋ weɪ/',
        meaningVi: 'Đã tiến một chặng đường rất xa / Tiến bộ vượt bậc',
        example: "We've definitely come a long way since we started this project three months ago.",
        exampleVi: 'Chúng ta chắc chắn đã tiến một chặng đường rất xa kể từ khi bắt đầu dự án này 3 tháng trước.',
        collocationTip: 'Dùng để khích lệ bản thân, con cái hoặc đội ngũ nhân sự.',
      },
      {
        phrase: 'the sky is the limit',
        ipa: '/ðə skaɪ ɪz ðə ˈlɪmɪt/',
        meaningVi: 'Không còn giới hạn nào nữa / Tương lai rộng mở phía trước',
        example: 'Now that language is no longer a barrier, the sky is the limit!',
        exampleVi: 'Giờ đây khi ngôn ngữ không còn là rào cản, tương lai phía trước không còn giới hạn nào nữa!',
        collocationTip: 'Câu kết đầy cảm hứng cho các bài phát biểu.',
      },
    ],
    shadowingDrills: [
      {
        id: 'd90-s1',
        text: 'Consistency was tough at times, but speaking English has genuinely become second nature to me.',
        translationVi: 'Duy trì kỷ luật đôi lúc không dễ dàng, nhưng việc cất tiếng nói tiếng Anh giờ đây đã thực sự trở thành bản năng tự nhiên của tôi.',
        intonationTip: 'Giọng tự hào, trầm ấm, truyền cảm hứng.',
        linkingTip: 'Nối âm: tough_at_times, second_nature_to_me.',
        speakerRole: 'Học viên Tốt nghiệp (B1+)',
      },
    ],
    bedtimeReflex: {
      scenarioVi: 'Một đồng nghiệp trẻ hỏi bí quyết của bạn: "How did you manage to become so fluent while working full-time?"',
      challengePromptEn: 'Inspire them using "game changer" and "second nature".',
      sampleReflexA2: 'I practiced every day and did not worry about small mistakes.',
      sampleReflexB1:
        'Practicing out loud every single day was a total game changer—once you stop translating in your head, speaking English becomes second nature!',
      pedagogicalKey: 'Hoàn tất trọn vẹn chu trình chuyển hóa phản xạ 90 ngày.',
    },
  },
];

// ============================================================================
// PHẦN 2: 75 NGÀY CHUYÊN ĐỀ CHI TIẾT (ĐƯỢC BIÊN SOẠN RIÊNG CHO ĐỘ TUỔI 30-40)
// ============================================================================
const ADDITIONAL_75_DAYS_CATALOG: CompactDayBlueprint[] = [
  // --- THÁNG 1: NGÀY 11 - 30 (ĐỜI SỐNG GIA ĐÌNH, SỨC KHỎE & DỊCH VỤ QUỐC TẾ) ---
  {
    day: 11,
    titleEn: 'Planning a Family Weekend Getaway',
    titleVi: 'Lên kế hoạch Đưa Gia đình Đi Nghỉ dưỡng Cuối tuần',
    theme: 'Family Bonding & Travel Planning',
    aiPersonaRole: 'Hannah - Chuyên viên Tư vấn Khu nghỉ dưỡng Ven biển',
    userRole: 'Phụ huynh đặt dịch vụ nghỉ dưỡng cuối tuần cho gia đình',
    scenarioDescription: 'Bạn gọi điện tới khu nghỉ dưỡng để hỏi về các hoạt động ngoài trời an toàn cho trẻ nhỏ và không gian thư giãn cho vợ chồng.',
    roleplayGoal: 'Hỏi thông tin phòng gia đình, khu vui chơi trẻ em và đặt lịch ăn tối.',
    greetingEn: 'Hello! Thank you for calling Coastal Breeze Resort. How can I help you plan your family getaway?',
    greetingVi: 'Xin chào! Cảm ơn bạn đã gọi đến Khu nghỉ dưỡng Coastal Breeze. Tôi có thể giúp gì cho kỳ nghỉ gia đình của bạn?',
    suggestedA2: 'I want to book a family room for this weekend. Do you have a kids club?',
    suggestedB1: "Hi Hannah! We're looking to take a short breather this weekend. Do you have any family suites with kid-friendly activities?",
    chunks: [
      ['take a short breather', '/teɪk ə ʃɔːrt ˈbriːðər/', 'Nghỉ xả hơi ngắn ngày', 'We need to take a short breather from city life.', 'Chúng tôi cần nghỉ xả hơi ngắn ngày khỏi nhịp sống đô thị.', 'Rất tự nhiên khi nói về kỳ nghỉ ngắn.'],
      ['kid-friendly activities', '/kɪd ˈfrɛndli ækˈtɪvətiz/', 'Các hoạt động phù hợp và an toàn cho trẻ em', 'Does the resort offer kid-friendly activities on Saturdays?', 'Khu nghỉ dưỡng có các hoạt động cho trẻ em vào thứ Bảy không?', 'Cụm từ thiết thực cho các bậc phụ huynh.'],
      ['change of scenery', '/tʃeɪndʒ əv ˈsiːnəri/', 'Đổi gió / Thay đổi không gian', 'A quick trip to the beach will be a nice change of scenery.', 'Một chuyến đi biển ngắn sẽ là dịp đổi gió tuyệt vời.', 'Thay cho "go to a new place".'],
    ],
  },
  {
    day: 12,
    titleEn: 'Annual Health Checkup & Describing Symptoms',
    titleVi: 'Khám Sức khỏe Định kỳ & Mô tả Triệu chứng Cơ thể',
    theme: 'Preventive Healthcare & Executive Wellness',
    aiPersonaRole: 'Dr. Miller - Bác sĩ Đa khoa Quốc tế',
    userRole: 'Bệnh nhân đi khám sức khỏe định kỳ và hỏi về chứng mỏi vai gáy',
    scenarioDescription: 'Bạn đi khám sức khỏe tổng quát tại phòng khám quốc tế và trao đổi với bác sĩ về tình trạng mỏi mắt, căng cơ vai do ngồi máy tính nhiều.',
    roleplayGoal: 'Mô tả chính xác triệu chứng mỏi vai gáy, thiếu ngủ và hỏi lời khuyên vận động.',
    greetingEn: 'Good morning! Please have a seat. Are you here for your annual checkup, or is something specific bothering you lately?',
    greetingVi: 'Chào buổi sáng! Mời bạn ngồi. Hôm nay bạn tới khám định kỳ hàng năm hay gần đây có triệu chứng gì khó chịu không?',
    suggestedA2: 'I am here for my checkup. Also, my neck and shoulders feel stiff from computer work.',
    suggestedB1: "Morning Doctor! I'm here for my annual checkup, though I've also been having a stiff neck from sitting at my desk all day.",
    chunks: [
      ['annual health checkup', '/ˈænjuəl hɛlθ ˈtʃɛkʌp/', 'Khám sức khỏe tổng quát hàng năm', 'I never skip my annual health checkup.', 'Tôi không bao giờ bỏ qua kỳ khám sức khỏe tổng quát hàng năm.', 'Từ vựng thiết yếu cho tuổi 30–40.'],
      ['have a stiff neck / backache', '/hæv ə stɪf nɛk/', 'Bị cứng cổ / mỏi vai gáy', 'I woke up with a stiff neck this morning.', 'Sáng nay tôi thức dậy thấy bị cứng mỏi vùng cổ.', 'Mô tả triệu chứng dân văn phòng.'],
      ['under the weather', '/ˈʌndər ðə ˈwɛðər/', 'Hơi mệt trong người / Trái gió trở trời', "I'm feeling a bit under the weather today.", 'Hôm nay tôi cảm thấy hơi mệt trong người.', 'Thành ngữ thông dụng nhất để nói về sức khỏe.'],
    ],
  },
  {
    day: 13,
    titleEn: 'Shopping for Smart Casual Business Attire',
    titleVi: 'Mua sắm Trang phục Công sở Lịch lãm (Smart Casual)',
    theme: 'Executive Wardrobe & Sizing',
    aiPersonaRole: 'Oliver - Chuyên viên Tư vấn Thời trang Nam/Nữ Cao cấp',
    userRole: 'Khách hàng tìm mua áo blazer vừa vặn để đi dự hội thảo',
    scenarioDescription: 'Bạn đang chọn mua một chiếc áo khoác Blazer lịch sự nhưng thoải mái tại cửa hàng thời trang quốc tế.',
    roleplayGoal: 'Hỏi phòng thử đồ, yêu cầu đổi sang một cỡ lớn/nhỏ hơn và hỏi chất liệu vải.',
    greetingEn: 'Welcome! Are you looking for something formal for an event, or more of a smart-casual look?',
    greetingVi: 'Chào mừng quý khách! Bạn đang tìm trang phục trang trọng cho sự kiện hay phong cách công sở năng động (smart-casual)?',
    suggestedA2: 'I need a jacket for a business conference. Can I try this one on?',
    suggestedB1: "Hi! I'm looking for a smart-casual blazer for an upcoming conference. Could I try this on in a medium?",
    chunks: [
      ['try this on in a medium', '/traɪ ðɪs ɑːn ɪn ə ˈmiːdiəm/', 'Mặc thử món này cỡ vừa (Size M)', 'Where is the fitting room? I would love to try this on.', 'Phòng thử đồ ở đâu nhỉ? Tôi muốn mặc thử chiếc này.', 'Cấu trúc chuẩn khi đi mua quần áo.'],
      ['fits like a glove', '/fɪts laɪk ə ɡlʌv/', 'Mặc vừa in như đo ni đóng giày', 'This blazer fits like a glove around the shoulders!', 'Chiếc áo blazer này vừa vặn phần vai như đo ni đóng giày vậy!', 'Lời khen tự nhiên khi thử đồ.'],
      ['wrinkle-free fabric', '/ˈrɪŋkəl friː ˈfæbrɪk/', 'Chất vải chống nhăn (tiện mang đi công tác)', 'Do you have this shirt in a wrinkle-free fabric?', 'Mẫu áo sơ mi này có loại vải chống nhăn không?', 'Rất hữu ích cho người hay đi công tác.'],
    ],
  },
  {
    day: 14,
    titleEn: 'Fitness Coaching & Staying Active in Your 30s',
    titleVi: 'Tập luyện Thể hình & Duy trì Thể lực Tuổi 35+',
    theme: 'Strength, Posture & Stamina',
    aiPersonaRole: 'Coach Ryan - Huấn luyện viên Thể lực Cá nhân',
    userRole: 'Học viên muốn cải thiện sức bền và bảo vệ khớp lưng/gối',
    scenarioDescription: 'Bạn trao đổi với huấn luyện viên tại phòng tập về mục tiêu tăng sức bền, giảm mỡ nội tạng và tránh chấn thương khớp.',
    roleplayGoal: 'Chia sẻ mục tiêu thể chất, tiền sử đau mỏi lưng và thời gian biểu tập luyện.',
    greetingEn: 'Great to have you at the gym today! What are your main fitness goals for the next three months?',
    greetingVi: 'Rất vui được đón bạn tại phòng tập hôm nay! Mục tiêu thể lực chính của bạn trong 3 tháng tới là gì?',
    suggestedA2: 'I want to get stronger and have more energy for my work.',
    suggestedB1: "My main goal is to stay in shape, boost my stamina, and strengthen my core without putting too much strain on my lower back.",
    chunks: [
      ['stay in shape / get back in shape', '/steɪ ɪn ʃeɪp/', 'Giữ vóc dáng / Lấy lại phong độ thể chất', 'Swimming helps me stay in shape.', 'Bơi lội giúp tôi duy trì vóc dáng và thể lực.', 'Cụm từ phổ biến nhất về rèn luyện sức khỏe.'],
      ['build core strength', '/bɪld kɔːr strɛŋθ/', 'Tăng cường sức mạnh cơ lõi (bụng/lưng)', 'Building core strength prevents lower back pain.', 'Tăng sức mạnh cơ lõi giúp ngăn ngừa đau lưng dưới.', 'Kiến thức thể thao thực tế.'],
      ['work up a sweat', '/wɜːrk ʌp ə swɛt/', 'Vận động cho ra mồ hôi sảng khoái', 'It feels great to work up a sweat before breakfast.', 'Thật sảng khoái khi vận động ra mồ hôi trước bữa sáng.', 'Khẩu ngữ tự nhiên.'],
    ],
  },
  {
    day: 15,
    titleEn: 'Cooking Together & Sharing Vietnamese Cuisine',
    titleVi: 'Vào bếp Cùng Gia đình & Giới thiệu Ẩm thực Việt Nam',
    theme: 'Culinary Heritage & Home Life',
    aiPersonaRole: 'Claire - Đồng nghiệp người Pháp yêu thích ẩm thực châu Á',
    userRole: 'Chuyên gia Việt Nam giới thiệu món ăn gia đình',
    scenarioDescription: 'Bạn mời đồng nghiệp nước ngoài dùng bữa tại nhà hoặc giới thiệu cách làm một món ăn truyền thống của Việt Nam.',
    roleplayGoal: 'Mô tả nguyên liệu tươi ngon, hương vị cân bằng và cách thưởng thức món Việt.',
    greetingEn: 'This smells absolutely incredible! What is the secret behind this Vietnamese dish?',
    greetingVi: 'Món này thơm tuyệt vời quá! Bí quyết đằng sau món ăn Việt Nam này là gì vậy?',
    suggestedA2: 'We use fresh herbs, fish sauce, and slow-cooked broth.',
    suggestedB1: 'Thank you! The secret lies in simmering the bone broth for hours and balancing it with fresh herbs and fish sauce.',
    chunks: [
      ['made from scratch', '/meɪd frʌm skrætʃ/', 'Tự tay làm từ nguyên liệu tươi (không dùng đồ đóng hộp)', 'My wife and I made the spring rolls from scratch.', 'Hai vợ chồng tôi tự tay cuốn món nem này từ nguyên liệu tươi.', 'Cụm từ cực hay để khen đồ ăn nhà làm.'],
      ['a balance of flavors', '/ə ˈbæləns əv ˈfleɪvərz/', 'Sự cân bằng hài hòa giữa các tầng hương vị', 'Vietnamese cuisine is famous for its delicate balance of flavors.', 'Ẩm thực Việt Nam nổi tiếng với sự cân bằng hương vị tinh tế.', 'Giúp bạn tự hào giới thiệu văn hóa Việt.'],
      ['help yourself to...', '/hɛlp jərˈsɛlf tuː/', 'Cứ tự nhiên gắp/thưởng thức món... nhé', 'Please feel right at home and help yourself to some more!', 'Bạn cứ tự nhiên như ở nhà và dùng thêm món nhé!', 'Câu mời khách chuẩn mực của chủ nhà.'],
    ],
  },
  {
    day: 16,
    titleEn: 'Talking About Hobbies & Personal Recharge',
    titleVi: 'Chia sẻ Thú vui Tao nhã & Cách Tái tạo Năng lượng',
    theme: 'Mindfulness & Personal Passions',
    aiPersonaRole: 'Daniel - Kiến trúc sư người Úc',
    userRole: 'Người đi làm chia sẻ đam mê ngoài giờ làm việc (cây cảnh, đọc sách, công nghệ)',
    scenarioDescription: 'Trong giờ nghỉ giải lao, bạn và Daniel trò chuyện về những thú vui giúp giải tỏa căng thẳng sau giờ làm.',
    roleplayGoal: 'Chia sẻ một sở thích cá nhân sâu sắc và lý do nó giúp bạn cân bằng tâm trí.',
    greetingEn: 'Outside of work and family duties, what do you usually do to clear your head?',
    greetingVi: 'Ngoài công việc và trách nhiệm gia đình, bạn thường làm gì để đầu óc thư thái?',
    suggestedA2: 'I like learning new technology and reading books on weekends.',
    suggestedB1: "Whenever I have some spare time, I love tinkering with AI tools and tending to my balcony garden—it really clears my head.",
    chunks: [
      ['clear my head', '/klɪr maɪ hɛd/', 'Làm thoáng đầu óc / Xua tan căng thẳng', 'A morning walk always helps me clear my head.', 'Đi bộ buổi sáng luôn giúp tôi làm thoáng đầu óc.', 'Rất thông dụng.'],
      ['lose track of time', '/luːz træk əv taɪm/', 'Mê mải đến mức quên cả thời gian', 'When I am working on a creative video project, I completely lose track of time.', 'Khi tôi mải mê với một dự án sáng tạo video, tôi hoàn toàn quên cả thời gian.', 'Diễn tả sự say mê tuyệt đối.'],
      ['take my mind off work', '/teɪk maɪ maɪnd ɔːf wɜːrk/', 'Tạm gác công việc ra khỏi đầu', 'Playing with my kids takes my mind off work immediately.', 'Chơi đùa cùng các con giúp tôi tạm gác ngay công việc sang một bên.', 'Cấu trúc thực tế.'],
    ],
  },
  {
    day: 17,
    titleEn: 'International Banking & Credit Card Inquiries',
    titleVi: 'Giao dịch Ngân hàng & Xử lý Thẻ Tín dụng Quốc tế',
    theme: 'Financial Literacy & Travel Security',
    aiPersonaRole: 'Elena - Chuyên viên Hỗ trợ Thẻ Quốc tế',
    userRole: 'Chủ thẻ yêu cầu mở khóa thanh toán quốc tế trước chuyến công tác',
    scenarioDescription: 'Bạn gọi cho ngân hàng để thông báo lịch đi công tác nước ngoài nhằm tránh việc thẻ tín dụng bị khóa tự động khi quẹt ở nước ngoài.',
    roleplayGoal: 'Yêu cầu kích hoạt tính năng thanh toán nước ngoài, hỏi tỷ giá quy đổi ngoại tệ.',
    greetingEn: 'Thank you for calling Premier Banking Support. How may I assist you with your account today?',
    greetingVi: 'Cảm ơn quý khách đã gọi tới Hỗ trợ Ngân hàng Ưu tiên. Hôm nay tôi có thể hỗ trợ gì cho tài khoản của quý khách?',
    suggestedA2: 'I will travel to Europe next week. Please make sure my credit card works there.',
    suggestedB1: "Hi! I'm traveling overseas on business next week, so I'd like to set up a travel notice on my credit card to avoid any security blocks.",
    chunks: [
      ['traveling overseas on business', '/ˈtrævəlɪŋ ˌoʊvərˈsiːz ɑːn ˈbɪznəs/', 'Đi công tác nước ngoài', 'I go overseas on business twice a quarter.', 'Tôi đi công tác nước ngoài hai lần mỗi quý.', 'Chuẩn mực công sở.'],
      ['foreign transaction fee', '/ˈfɔːrən trænˈzækʃən fiː/', 'Phí giao dịch ngoại tệ', 'Does this card waive the foreign transaction fee?', 'Thẻ này có được miễn phí giao dịch ngoại tệ không?', 'Thuật ngữ tài chính thiết thực.'],
      ['exchange rate', '/ɪksˈtʃeɪndʒ reɪt/', 'Tỷ giá hối đoái', 'What is the current exchange rate for US Dollars?', 'Tỷ giá hiện tại cho đồng Đô la Mỹ là bao nhiêu?', 'Dùng tại ngân hàng và sân bay.'],
    ],
  },
  {
    day: 18,
    titleEn: 'Airport Check-In, Lounge Access & Flight Connections',
    titleVi: 'Thủ tục Sân bay, Phòng chờ & Nối chuyến Quốc tế',
    theme: 'Global Mobility & Aviation',
    aiPersonaRole: 'Grace - Nhân viên Thủ tục Hàng không Quốc tế',
    userRole: 'Hành khách làm thủ tục ký gửi hành lý và chọn ghế ngồi lối đi',
    scenarioDescription: 'Bạn làm thủ tục tại sân bay cho chuyến bay đường dài có quá cảnh. Bạn muốn chọn ghế cạnh lối đi và kiểm tra hành lý có được chuyển thẳng tới điểm cuối không.',
    roleplayGoal: 'Xin ghế lối đi (aisle seat), xác nhận hành lý ký gửi đi thẳng (checked all the way through).',
    greetingEn: 'Good morning! Where are you flying to today, and may I see your passport?',
    greetingVi: 'Chào buổi sáng! Hôm nay quý khách bay tới đâu ạ, và cho phép tôi xem hộ chiếu của quý khách?',
    suggestedA2: 'I am flying to London. Can I have a seat near the aisle, please?',
    suggestedB1: 'Morning! Here is my passport. Could I get an aisle seat near the front, and will my luggage be checked all the way through to London?',
    chunks: [
      ['an aisle seat / a window seat', '/ən aɪl siːt/', 'Ghế sát lối đi / Ghế sát cửa sổ', 'I prefer an aisle seat on long-haul flights.', 'Tôi thích ngồi ghế sát lối đi trên các chuyến bay đường dài.', 'Lưu ý chữ "s" trong "aisle" là âm câm.'],
      ['checked all the way through', '/tʃɛkt ɔːl ðə weɪ θruː/', 'Hành lý được chuyển thẳng tới điểm đến cuối cùng', 'Your bags are checked all the way through to your final destination.', 'Hành lý của quý khách đã được chuyển thẳng tới điểm đến cuối cùng.', 'Câu hỏi sống còn khi bay nối chuyến.'],
      ['boarding starts at...', '/ˈbɔːrdɪŋ stɑːrts æt/', 'Giờ bắt đầu lên máy bay là...', 'Boarding starts at Gate 14 in forty minutes.', 'Giờ lên máy bay bắt đầu tại Cổng 14 sau 40 phút nữa.', 'Nghe thông báo sân bay.'],
    ],
  },
  {
    day: 19,
    titleEn: 'Resolving Utility & Subscription Billing Issues',
    titleVi: 'Giải quyết Sự cố Hóa đơn & Dịch vụ Phần mềm',
    theme: 'Consumer Rights & Clear Communication',
    aiPersonaRole: 'Kevin - Chuyên viên Hỗ trợ Khách hàng Doanh nghiệp',
    userRole: 'Khách hàng phát hiện tài khoản bị trừ tiền hai lần cho một gói dịch vụ',
    scenarioDescription: 'Tài khoản của bạn bị tính phí đúp (double-charged) cho gói phần mềm đám mây. Bạn liên hệ bộ phận hỗ trợ để yêu cầu kiểm tra và hoàn tiền.',
    roleplayGoal: 'Trình bày rõ ràng vấn đề bị trừ tiền 2 lần và yêu cầu hoàn lại khoản thu thừa.',
    greetingEn: 'Hello! Welcome to Billing Support. Could you tell me what seems to be the issue with your latest invoice?',
    greetingVi: 'Xin chào! Chào mừng bạn đến với Bộ phận Hỗ trợ Thanh toán. Bạn có thể cho tôi biết vấn đề với hóa đơn mới nhất của bạn là gì không?',
    suggestedA2: 'I looked at my bill and saw that you charged me twice this month.',
    suggestedB1: "Hi Kevin, I was reviewing my monthly statement and noticed I was accidentally double-charged for my subscription.",
    chunks: [
      ['be double-charged for...', '/bi ˈdʌbəl tʃɑːrdʒd fɔːr/', 'Bị tính tiền hai lần cho cùng một dịch vụ', 'It looks like my card was double-charged for the annual plan.', 'Có vẻ như thẻ của tôi đã bị trừ tiền hai lần cho gói dịch vụ năm.', 'Ngắn gọn và chính xác tuyệt đối.'],
      ['look into this right away', '/lʊk ˈɪntu ðɪs raɪt əˈweɪ/', 'Kiểm tra và xử lý việc này ngay lập tức', "I'll look into this right away and issue a refund.", 'Tôi sẽ kiểm tra việc này ngay lập tức và hoàn tiền cho bạn.', 'Dùng được cả khi bạn hỗ trợ khách hàng.'],
      ['issue a full refund', '/ˈɪʃuː ə fʊl ˈriːfʌnd/', 'Hoàn trả lại toàn bộ số tiền', 'We will issue a full refund within 3 business days.', 'Chúng tôi sẽ hoàn lại toàn bộ số tiền trong vòng 3 ngày làm việc.', 'Thuật ngữ dịch vụ chuẩn.'],
    ],
  },
  {
    day: 20,
    titleEn: 'Returning Defective Equipment & Warranty Claims',
    titleVi: 'Đổi trả Thiết bị Lỗi & Yêu cầu Bảo hành Chính hãng',
    theme: 'Hardware Quality & After-Sales Service',
    aiPersonaRole: 'Rachel - Quản lý Trung tâm Bảo hành Thiết bị',
    userRole: 'Khách hàng mang đổi một tai nghe chống ồn bị lỗi kết nối Bluetooth',
    scenarioDescription: 'Chiếc tai nghe phục vụ họp trực tuyến bạn mới mua bị lỗi micro. Bạn mang ra cửa hàng để yêu cầu đổi sản phẩm mới theo chế độ bảo hành.',
    roleplayGoal: 'Mô tả lỗi thiết bị, xuất trình hóa đơn và yêu cầu đổi chiếc mới (replacement).',
    greetingEn: 'Hi there! How can I help you at the service desk today?',
    greetingVi: 'Chào bạn! Hôm nay quầy dịch vụ khách hàng có thể giúp gì cho bạn?',
    suggestedA2: 'I bought this headset yesterday, but the microphone does not work. Can I get a new one?',
    suggestedB1: "Hi! I purchased this headset two days ago, but the microphone keeps cutting out. Since it's still under warranty, could I get a replacement?",
    chunks: [
      ['still under warranty', '/stɪl ˈʌndər ˈwɔːrənti/', 'Vẫn còn trong thời hạn bảo hành', 'Is the device still under warranty?', 'Thiết bị này vẫn còn trong thời hạn bảo hành chứ?', 'Cụm từ quan trọng khi mua đồ công nghệ/máy móc.'],
      ['exchange it for a replacement', '/ɪksˈtʃeɪndʒ ɪt fɔːr ə rɪˈpleɪsmənt/', 'Đổi lấy một sản phẩm mới thay thế', "I'd like to exchange this defective unit for a replacement.", 'Tôi muốn đổi thiết bị lỗi này lấy một chiếc mới thay thế.', 'Rõ ràng, chuyên nghiệp.'],
      ['have the receipt on me', '/hæv ðə rɪˈsiːt ɑːn miː/', 'Có mang sẵn hóa đơn theo người', 'Yes, I have the digital receipt right here on my phone.', 'Vâng, tôi có lưu hóa đơn điện tử ngay trên điện thoại đây.', 'Lưu ý chữ "p" trong "receipt" là âm câm.'],
    ],
  },
  {
    day: 21,
    titleEn: 'Parenting & Discussing Education with Teachers',
    titleVi: 'Đồng hành Cùng Con & Trao đổi với Giáo viên Quốc tế',
    theme: 'Family Education & Child Development',
    aiPersonaRole: 'Ms. Jenkins - Giáo viên Bản ngữ của Con',
    userRole: 'Phụ huynh trao đổi về sự tiến bộ và thói quen học tập của con',
    scenarioDescription: 'Bạn gặp giáo viên tiếng Anh của con để hỏi thăm về mức độ tự tin giao tiếp của bé trên lớp và cách gia đình có thể đồng hành tại nhà.',
    roleplayGoal: 'Hỏi về điểm mạnh của con trên lớp và chia sẻ việc cả gia đình đang cùng học tiếng Anh mỗi tối.',
    greetingEn: "It's wonderful to meet you! Thank you for coming in to discuss your child's progress this semester.",
    greetingVi: 'Rất vui được gặp phụ huynh! Cảm ơn bạn đã dành thời gian tới trao đổi về sự tiến bộ của bé trong học kỳ này.',
    suggestedA2: 'Thank you Teacher! How is my child doing in speaking class?',
    suggestedB1: "It's a pleasure, Ms. Jenkins! We're really keen to know how she's adjusting to the class and how we can support her speaking habit at home.",
    chunks: [
      ['lead by example', '/liːd baɪ ɪɡˈzæmpəl/', 'Làm gương bằng hành động thực tế', 'As parents, we try to lead by example and practice English every night.', 'Là cha mẹ, chúng tôi cố gắng làm gương và cùng luyện tiếng Anh mỗi tối.', 'Câu nói truyền cảm hứng của các bậc phụ huynh hiện đại.'],
      ['come out of their shell', '/kʌm aʊt əv ðɛr ʃɛl/', 'Trở nên dạn dĩ, bớt rụt rè hơn', 'She has really come out of her shell over the past month!', 'Bé đã thực sự trở nên dạn dĩ và cởi mở hơn rất nhiều trong tháng qua!', 'Thành ngữ tuyệt hay để nói về sự trưởng thành.'],
      ['curious and engaged', '/ˈkjʊriəs ænd ɪnˈɡeɪdʒd/', 'Ham học hỏi và tập trung tương tác', 'We want to keep our kids curious and engaged.', 'Chúng tôi muốn giữ cho các con sự ham học hỏi và hào hứng tương tác.', 'Từ vựng giáo dục hiện đại.'],
    ],
  },
  {
    day: 22,
    titleEn: 'Bookstores, Self-Growth & Continuous Learning',
    titleVi: 'Tủ sách Quản trị, Phát triển Bản thân & Học tập Suốt đời',
    theme: 'Lifelong Learning & Intellectual Growth',
    aiPersonaRole: 'Noah - Quản lý Hiệu sách Chuyên ngành',
    userRole: 'Độc giả tìm sách về quản trị, lãnh đạo và công nghệ mới',
    scenarioDescription: 'Bạn ghé một hiệu sách lớn tại sân bay quốc tế để tìm một cuốn sách hay về tư duy lãnh đạo hoặc trí tuệ nhân tạo để đọc trên chuyến bay.',
    roleplayGoal: 'Nhờ gợi ý một cuốn sách bán chạy (bestseller) dễ đọc nhưng sâu sắc.',
    greetingEn: 'Hello! Welcome to Executive Reads. Are you looking for a specific title, or would you like a recommendation?',
    greetingVi: 'Xin chào! Chào mừng đến với Executive Reads. Bạn đang tìm một tựa sách cụ thể hay muốn tôi gợi ý giúp bạn?',
    suggestedA2: 'Can you recommend a good book about leadership or technology?',
    suggestedB1: "Hi! I have a long flight ahead, so I'm looking for a page-turner on modern leadership or practical AI.",
    chunks: [
      ['a real page-turner', '/ə rɪəl ˈpeɪdʒˌtɜːrnər/', 'Cuốn sách hấp dẫn đến mức không rời mắt được', 'This biography is a real page-turner!', 'Cuốn hồi ký này hấp dẫn đến mức đọc không dứt ra được!', 'Cách khen sách chuẩn bản xứ.'],
      ['broaden my perspective', '/ˈbrɔːdən maɪ pərˈspɛktɪv/', 'Mở rộng góc nhìn / tư duy của bản thân', 'Reading international books helps broaden my perspective.', 'Đọc sách quốc tế giúp mở rộng góc nhìn của tôi.', 'Dùng rất tốt trong phỏng vấn và thuyết trình.'],
      ['practical takeaways', '/ˈpræktɪkəl ˈteɪkəˌweɪz/', 'Những bài học có tính ứng dụng thực tế ngay', 'The book is packed with practical takeaways for managers.', 'Cuốn sách chứa đầy những bài học ứng dụng thực tế cho người quản lý.', 'Từ vựng B1+ đắt giá.'],
    ],
  },
  {
    day: 23,
    titleEn: 'Neighborly Rapport & Expat Community Living',
    titleVi: 'Giao lưu Hàng xóm Quốc tế & Đời sống Khu dân cư',
    theme: 'Community & Friendly Banter',
    aiPersonaRole: 'Mark - Người hàng xóm ngoại quốc mới chuyển đến cùng khu chung cư',
    userRole: 'Cư dân thân thiện chào đón hàng xóm mới và chỉ dẫn tiện ích',
    scenarioDescription: 'Bạn gặp một gia đình người nước ngoài mới chuyển đến sống cùng tầng. Bạn chủ động chào hỏi và giới thiệu các tiện ích quanh khu nhà.',
    roleplayGoal: 'Chào đón ấm áp, giới thiệu siêu thị/công viên gần nhà và sẵn sàng hỗ trợ.',
    greetingEn: "Hi neighbor! We just moved into apartment 12B yesterday. We're still unpacking all the boxes!",
    greetingVi: 'Chào hàng xóm! Gia đình tôi vừa chuyển tới căn 12B hôm qua. Chúng tôi vẫn đang dỡ đồ đạc trong các thùng carton!',
    suggestedA2: 'Welcome to our building! If you need any help, please tell me.',
    suggestedB1: "Welcome to the neighborhood, Mark! Moving is always exhausting—how are you guys settling in so far?",
    chunks: [
      ['settle in nicely', '/ˈsɛtəl ɪn ˈnaɪsli/', 'Ổn định chỗ ở / Quen dần với môi trường mới', 'I hope your family settles in nicely here.', 'Tôi hy vọng gia đình bạn sẽ sớm ổn định và thấy thoải mái ở đây.', 'Dùng cho cả nhà mới lẫn nhân viên mới nhận việc.'],
      ['show you the ropes', '/ʃoʊ juː ðə roʊps/', 'Chỉ dẫn cho bạn nắm rõ cách thức mọi thứ hoạt động', "I'd be happy to show you the ropes around the building.", 'Tôi rất sẵn lòng chỉ dẫn cho bạn các tiện ích quanh tòa nhà.', 'Thành ngữ gốc hàng hải cực kỳ phổ biến trong công sở.'],
      ['give me a shout', '/ɡɪv mi ə ʃaʊt/', 'Cứ ới tôi một tiếng nhé', 'If you need a good local plumber or anything, just give me a shout!', 'Nếu bạn cần thợ sửa ống nước uy tín hay bất cứ gì, cứ ới tôi một tiếng nhé!', 'Thân thiện và gần gũi.'],
    ],
  },
  {
    day: 24,
    titleEn: 'Weather Changes & Contingency Planning for Events',
    titleVi: 'Dự báo Thời tiết & Phương án Dự phòng cho Sự kiện Ngoài trời',
    theme: 'Weather Nuances & Backup Plans',
    aiPersonaRole: 'Jason - Trưởng ban Tổ chức Sự kiện Gia đình Công ty',
    userRole: 'Thành viên ban tổ chức bàn phương án dự phòng khi trời sắp mưa',
    scenarioDescription: 'Công ty chuẩn bị tổ chức ngày hội gia đình (Family Day) ngoài trời nhưng dự báo thời tiết báo có thể có mưa rào bất chợt.',
    roleplayGoal: 'Nhận định thời tiết và thống nhất phương án dự phòng trong nhà (indoor backup plan).',
    greetingEn: 'Have you checked the forecast for Saturday? The sky looks a bit unpredictable this week.',
    greetingVi: 'Bạn đã xem dự báo thời tiết cho thứ Bảy chưa? Thời tiết tuần này trông có vẻ hơi thất thường.',
    suggestedA2: 'Yes, it might rain on Saturday. We should prepare a tent or an indoor room.',
    suggestedB1: "I just checked! There's a chance of scattered showers, so we should definitely have an indoor backup plan just in case.",
    chunks: [
      ['play it by ear', '/pleɪ ɪt baɪ ɪr/', 'Tùy cơ ứng biến theo tình hình thực tế', "Let's prepare the ballroom and play it by ear on Saturday morning.", 'Hãy chuẩn bị sẵn phòng hội trường rồi sáng thứ Bảy chúng ta tùy cơ ứng biến.', 'Thành ngữ cực kỳ thông dụng.'],
      ['just in case', '/dʒʌst ɪn keɪs/', 'Phòng hờ trường hợp bất trắc', 'Bring an extra jacket just in case it gets chilly.', 'Hãy mang theo một chiếc áo khoác dự phòng phòng khi trời trở lạnh.', 'Ngắn gọn, thực tế.'],
      ['blow over quickly', '/bloʊ ˈoʊvər ˈkwɪkli/', 'Cơn mưa/bão nhanh chóng tạnh (hoặc rắc rối mau qua đi)', 'Hopefully the rain will blow over quickly by noon.', 'Hy vọng cơn mưa sẽ nhanh chóng tạnh trước buổi trưa.', 'Dùng hay cho cả thời tiết lẫn khủng hoảng.'],
    ],
  },
  {
    day: 25,
    titleEn: 'Celebrating Milestones & Giving a Warm Toast',
    titleVi: 'Chúc mừng Cột mốc Đáng nhớ & Nâng ly Phát biểu Ngắn',
    theme: 'Public Speaking & Gratitude',
    aiPersonaRole: 'Victoria - Đối tác Lâu năm trong Tiệc Kỷ niệm',
    userRole: 'Người đại diện nâng ly chúc mừng thành công chung của tập thể',
    scenarioDescription: 'Trong buổi tiệc mừng hoàn thành dự án hoặc kỷ niệm ngày cưới/sinh nhật, bạn được mời nâng ly nói vài lời chúc mừng ngắn gọn.',
    roleplayGoal: 'Nói lời cảm ơn chân thành tới mọi người và nâng ly chúc sức khỏe, thành công.',
    greetingEn: 'Everyone has their glasses ready! Would you like to say a few words and propose a toast?',
    greetingVi: 'Mọi người đều đã cầm ly sẵn sàng rồi! Bạn có muốn phát biểu đôi lời và khởi xướng nâng ly chúc mừng không?',
    suggestedA2: 'Thank you everyone for working hard together! Cheers to our success!',
    suggestedB1: "I'd love to! Here's to an incredible team—thank you for having my back through thick and thin. Cheers to many more milestones ahead!",
    chunks: [
      ['propose a toast to...', '/prəˈpoʊz ə toʊst tuː/', 'Nâng ly chúc mừng...', "I'd like to propose a toast to our team's hard work.", 'Tôi xin phép nâng ly chúc mừng sự nỗ lực tuyệt vời của đội ngũ chúng ta.', 'Trang trọng và lịch lãm.'],
      ['through thick and thin', '/θruː θɪk ænd θɪn/', 'Qua mọi thăng trầm, khó khăn', 'My family has supported me through thick and thin.', 'Gia đình đã luôn làm điểm tựa cho tôi qua mọi thăng trầm.', 'Cụm từ giàu cảm xúc.'],
      ['have someone’s back', '/hæv ˈsʌmwʌnz bæk/', 'Luôn ủng hộ, bọc lót và bảo vệ nhau', 'I know my teammates always have my back.', 'Tôi biết các đồng đội luôn sát cánh và bọc lót cho tôi.', 'Tạo sự gắn kết mạnh mẽ.'],
    ],
  },
  {
    day: 26,
    titleEn: 'Outdoor Sports & Weekend Golf/Tennis Banter',
    titleVi: 'Giao lưu Thể thao Cuối tuần & Trò chuyện Trên Sân Tập',
    theme: 'Active Networking & Sportsmanship',
    aiPersonaRole: 'Peter - Đối tác Giao lưu Thể thao Sáng Chủ Nhật',
    userRole: 'Người chơi thể thao giao lưu vui vẻ, khiêm tốn nhưng tự tin',
    scenarioDescription: 'Bạn tham gia buổi giao lưu chạy bộ, cầu lông hoặc tennis/golf sáng cuối tuần cùng các đồng nghiệp và đối tác.',
    roleplayGoal: 'Khen cú đánh/thể lực của bạn chơi và chia sẻ tinh thần thể thao vui khỏe.',
    greetingEn: 'What a great morning for a game! How often do you get a chance to play these days?',
    greetingVi: 'Một buổi sáng cuối tuần tuyệt đẹp để ra sân! Dạo này bạn có hay thu xếp thời gian chơi được không?',
    suggestedA2: 'I play once a week on Sundays. You play very well!',
    suggestedB1: "I try to get out here every Sunday morning, though I'm still a bit rusty! That was a fantastic shot you just made.",
    chunks: [
      ['a bit rusty', '/ə bɪt ˈrʌsti/', 'Hơi lục nghề một chút (do lâu không tập)', 'Forgive me if I am a bit rusty—I have not played in a month!', 'Thông cảm nếu tôi hơi lục nghề chút nhé—cả tháng rồi tôi chưa ra sân!', 'Cách nói khiêm tốn rất duyên dáng.'],
      ['get some fresh air', '/ɡɛt sʌm frɛʃ ɛr/', 'Hít thở không khí trong lành ngoài trời', 'It feels great to step away from the computer and get some fresh air.', 'Thật tuyệt khi rời xa máy tính và ra ngoài hít thở không khí trong lành.', 'Dùng mọi lúc.'],
      ['a good sport', '/ə ɡʊd spɔːrt/', 'Người chơi đẹp, vui vẻ, giàu tinh thần thể thao', 'Win or lose, he is always such a good sport.', 'Dù thắng hay thua, anh ấy luôn giữ tinh thần thể thao rất tuyệt vời.', 'Khen tính cách đối tác.'],
    ],
  },
  {
    day: 27,
    titleEn: 'Sharing Vietnamese Cultural Traditions & Tet Holiday',
    titleVi: 'Giới thiệu Văn hóa Truyền thống & Tết Cổ truyền Việt Nam',
    theme: 'Cultural Pride & Storytelling',
    aiPersonaRole: 'Natalie - Chuyên gia Nước ngoài mới tới làm việc tại Việt Nam',
    userRole: 'Chuyên gia Việt Nam giải thích ý nghĩa văn hóa gia đình và lễ hội Việt',
    scenarioDescription: 'Natalie rất ấn tượng với hình ảnh phố đèn lồng và không khí sum họp gia đình ở Việt Nam nên hỏi bạn về các dịp lễ truyền thống.',
    roleplayGoal: 'Kể về truyền thống sum họp gia đình, phố đèn lồng và lòng hiếu khách của người Việt.',
    greetingEn: 'I love the warm family culture here in Vietnam! What is your favorite traditional holiday of the year?',
    greetingVi: 'Tôi rất yêu nét văn hóa gia đình ấm áp ở Việt Nam! Dịp lễ truyền thống yêu thích nhất trong năm của bạn là gì?',
    suggestedA2: 'I love Tet holiday and Mid-Autumn Festival because my family is together.',
    suggestedB1: 'Definitely the Lunar New Year and the Mid-Autumn Lantern Festival! They are all about family reunions and passing down traditions to our kids.',
    chunks: [
      ['family reunion', '/ˈfæməli riːˈjuːnjən/', 'Sự đoàn viên, sum họp gia đình', 'Tet is the biggest time of the year for family reunions.', 'Tết là thời điểm lớn nhất trong năm cho sự đoàn viên gia đình.', 'Từ vựng cốt lõi về văn hóa Á Đông.'],
      ['pass down traditions', '/pæs daʊn trəˈdɪʃənz/', 'Truyền lại các giá trị truyền thống cho thế hệ sau', 'We love passing down these cultural traditions to our daughter.', 'Chúng tôi rất trân trọng việc truyền lại những nét văn hóa này cho con gái mình.', 'Sâu sắc và giàu cảm xúc.'],
      ['warm hospitality', '/wɔːrm ˌhɑːspɪˈtæləti/', 'Lòng hiếu khách nồng hậu, ấm áp', 'Vietnam is known worldwide for its warm hospitality.', 'Việt Nam được biết đến trên toàn thế giới nhờ lòng hiếu khách nồng hậu.', 'Điểm tự hào dân tộc.'],
    ],
  },
  {
    day: 28,
    titleEn: 'Renting a Car & Understanding Insurance Coverage',
    titleVi: 'Thuê Xe Tự lái Nước ngoài & Kiểm tra Bảo hiểm Toàn diện',
    theme: 'Road Trip Logistics & Risk Protection',
    aiPersonaRole: 'Greg - Nhân viên Quầy Cho thuê Xe tại Sân bay',
    userRole: 'Khách hàng nhận xe thuê và yêu cầu gói bảo hiểm toàn diện',
    scenarioDescription: 'Bạn thuê xe ô tô tại sân bay để chủ động di chuyển giữa các nhà máy/điểm tham quan. Bạn muốn đảm bảo xe có bảo hiểm toàn diện (full coverage).',
    roleplayGoal: 'Kiểm tra loại nhiên liệu của xe, gói bảo hiểm không mức miễn thường và chỗ trả xe.',
    greetingEn: 'Welcome to Hertz Car Rental! We have your mid-size SUV ready. Would you like to review the insurance options?',
    greetingVi: 'Chào mừng đến với Hertz! Chúng tôi đã chuẩn bị sẵn chiếc SUV cỡ trung của bạn. Bạn có muốn xem qua các gói bảo hiểm không?',
    suggestedA2: 'Yes, please give me full insurance so I do not have to worry.',
    suggestedB1: "Yes, please! For peace of mind, I'd like to go with full coverage insurance, and could you confirm whether it takes unleaded petrol or diesel?",
    chunks: [
      ['for peace of mind', '/fɔːr piːs əv maɪnd/', 'Để hoàn toàn yên tâm', 'We always buy full insurance for peace of mind.', 'Chúng tôi luôn mua bảo hiểm toàn diện để hoàn toàn yên tâm.', 'Cụm từ cực kỳ hữu dụng trong đời sống và kỹ thuật.'],
      ['full coverage insurance', '/fʊl ˈkʌvərɪdʒ ɪnˈʃʊrəns/', 'Bảo hiểm toàn diện 100%', 'Does the rental price include full coverage insurance?', 'Giá thuê xe đã bao gồm bảo hiểm toàn diện chưa?', 'Tránh rủi ro tài chính khi đi nước ngoài.'],
      ['fill up the tank', '/fɪl ʌp ðə tæŋk/', 'Đổ đầy bình xăng trước khi trả xe', 'Remember to fill up the tank before returning the vehicle.', 'Hãy nhớ đổ đầy bình nhiên liệu trước khi hoàn trả xe nhé.', 'Quy tắc thuê xe quốc tế.'],
    ],
  },
  {
    day: 29,
    titleEn: 'Architecture, Engineering Marvels & Museum Exhibitions',
    titleVi: 'Thưởng lãm Công trình Kiến trúc – Kỹ thuật & Triển lãm',
    theme: 'Aesthetics & Engineering Appreciation',
    aiPersonaRole: 'Dr. Evans - Hướng dẫn viên Triển lãm Công nghệ & Kiến trúc',
    userRole: 'Khách tham quan ấn tượng với kết cấu kỹ thuật của công trình',
    scenarioDescription: 'Bạn tham quan một bảo tàng khoa học công nghệ và trao đổi về sự kỳ vĩ của các công trình kỹ thuật ngoài khơi và năng lượng tái tạo.',
    roleplayGoal: 'Bày tỏ sự ngưỡng mộ về độ chính xác kỹ thuật và quy mô của công trình.',
    greetingEn: 'What do you think of this scale model of the offshore wind turbine and marine platform?',
    greetingVi: 'Bạn nghĩ sao về mô hình tỷ lệ thu nhỏ của tuabin gió ngoài khơi và giàn kỹ thuật biển này?',
    suggestedA2: 'It looks amazing! Building this in the ocean must be very difficult.',
    suggestedB1: "It's truly a feat of engineering! The level of precision required to fabricate and install these structures offshore is mind-blowing.",
    chunks: [
      ['a feat of engineering', '/ə fiːt əv ˌɛndʒɪˈnɪrɪŋ/', 'Một kỳ công về mặt kỹ thuật chế tạo', 'That suspension bridge is a true feat of modern engineering.', 'Cây cầu treo đó thực sự là một kỳ công của kỹ thuật hiện đại.', 'Cụm từ đẳng cấp cho người yêu kỹ thuật.'],
      ['attention to detail', '/əˈtɛnʃən tə ˈdiːteɪl/', 'Sự tỉ mỉ, chú trọng đến từng chi tiết nhỏ', 'Their attention to detail in metal fabrication is outstanding.', 'Sự tỉ mỉ đến từng chi tiết của họ trong chế tạo kết cấu kim loại thật xuất sắc.', 'Khen ngợi chất lượng chuyên môn.'],
      ['stand the test of time', '/stænd ðə tɛst əv taɪm/', 'Bền bỉ trường tồn cùng thời gian', 'Good engineering is built to stand the test of time.', 'Kỹ thuật tốt được tạo ra để bền bỉ cùng thời gian.', 'Câu nói giàu tính triết lý nghề nghiệp.'],
    ],
  },
  {
    day: 30,
    titleEn: 'Month 1 Capstone: Effortless Everyday & Travel Fluency',
    titleVi: 'Cột mốc Tháng 1: Làm chủ Toàn diện Giao tiếp Đời sống & Công tác',
    theme: 'Month 1 Consolidation & Confidence Check',
    aiPersonaRole: 'Coach Alex - Huấn luyện viên Phản xạ SLA',
    userRole: 'Học viên hoàn thành 30 ngày đầu tiên, sẵn sàng bước vào tiếng Anh công sở',
    scenarioDescription: 'Bạn nhìn lại 30 ngày đầu tiên cùng Coach Alex, tổng kết sự thay đổi trong phản xạ giao tiếp đời sống trước khi bước sang Tháng 2 chuyên sâu về Công sở & Dự án.',
    roleplayGoal: 'Sử dụng mượt mà ít nhất 3 cụm từ đã học trong Tháng 1 để chia sẻ niềm vui tiến bộ.',
    greetingEn: 'Happy Day 30! You have completed the entire Month 1 milestone. How do you feel when speaking English in everyday situations now?',
    greetingVi: 'Chúc mừng Ngày 30! Bạn đã hoàn thành trọn vẹn cột mốc Tháng 1. Giờ đây bạn cảm thấy thế nào khi mở lời nói tiếng Anh trong các tình huống hàng ngày?',
    suggestedA2: 'I feel much faster and more confident now. I am ready for Month 2!',
    suggestedB1: "To be honest, I feel like I've really gotten the hang of it! Stepping out of my comfort zone on a regular basis has boosted my confidence tremendously.",
    chunks: [
      ['get the hang of it', '/ɡɛt ðə hæŋ əv ɪt/', 'Nắm bắt được nhịp / Quen tay quen miệng', "After 30 days, I've finally gotten the hang of thinking in English.", 'Sau 30 ngày, cuối cùng tôi đã quen nhịp suy nghĩ trực tiếp bằng tiếng Anh.', 'Cụm từ tổng kết sự thành thạo.'],
      ['make steady progress', '/meɪk ˈstɛdi ˈprɑːɡrɛs/', 'Tiến bộ vững chắc từng bước một', 'We are making steady progress toward our B1+ goal.', 'Chúng ta đang tiến bộ vững chắc từng bước hướng tới mục tiêu B1+.', 'Khích lệ tinh thần bền bỉ.'],
      ['pay off in the long run', '/peɪ ɔːf ɪn ðə lɔːŋ rʌn/', 'Đem lại trái ngọt xứng đáng về lâu dài', 'Daily discipline always pays off in the long run.', 'Kỷ luật mỗi ngày luôn đem lại trái ngọt xứng đáng về lâu dài.', 'Chốt lại Tháng 1 đầy tự hào.'],
    ],
  },

  // --- THÁNG 2: NGÀY 32 - 44 & 46 - 60 (TIẾNG ANH CÔNG SỞ, QUẢN LÝ DỰ ÁN & AN TOÀN KỸ THUẬT) ---
  {
    day: 32,
    titleEn: 'Pitching a Process Improvement Idea',
    titleVi: 'Đề xuất Ý tưởng Cải tiến Quy trình Làm việc',
    theme: 'Workplace Innovation & Initiative',
    aiPersonaRole: 'David - Trưởng Bộ phận Vận hành',
    userRole: 'Chuyên gia đề xuất áp dụng công cụ mới giúp tiết kiệm 20% thời gian báo cáo',
    scenarioDescription: 'Bạn trình bày ngắn gọn một sáng kiến tự động hóa hoặc chuẩn hóa biểu mẫu để giảm thời gian làm thủ tục giấy tờ cho anh em trong đội.',
    roleplayGoal: 'Nêu rõ điểm nghẽn hiện tại và lợi ích định lượng của giải pháp mới.',
    greetingEn: 'You mentioned you had a new idea to speed up our weekly reporting workflow. How does it work?',
    greetingVi: 'Bạn có đề cập rằng bạn có ý tưởng mới để tăng tốc quy trình báo cáo hàng tuần. Nó hoạt động như thế nào?',
    suggestedA2: 'If we use this new template, we can save two hours every Friday.',
    suggestedB1: "Right now we're spending too much time on manual data entry. By streamlining the template, we can cut reporting time by 20%.",
    chunks: [
      ['streamline the workflow', '/ˈstriːmlaɪn ðə ˈwɜːrkfloʊ/', 'Tinh gọn và tối ưu hóa quy trình làm việc', 'This new checklist will streamline our safety inspection workflow.', 'Bảng kiểm mới này sẽ giúp tinh gọn quy trình kiểm tra an toàn của chúng ta.', 'Từ vựng quản lý cấp cao.'],
      ['eliminate bottlenecks', '/ɪˈlɪməˌneɪt ˈbɑːtəlnɛks/', 'Loại bỏ các điểm nghẽn gây chậm tiến độ', 'Our priority is to eliminate bottlenecks in the fabrication stage.', 'Ưu tiên của chúng ta là loại bỏ các điểm nghẽn ở khâu chế tạo.', 'Rất sát thực tế kỹ thuật và dự án.'],
      ['worth a shot', '/wɜːrθ ə ʃɑːt/', 'Rất đáng để thử nghiệm', 'The setup takes only an hour, so it is definitely worth a shot!', 'Việc thiết lập chỉ mất một giờ, nên rất đáng để thử nghiệm!', 'Tự nhiên, thuyết phục.'],
    ],
  },
  {
    day: 33,
    titleEn: 'Negotiating Realistic Project Deadlines',
    titleVi: 'Đàm phán Mốc Thời gian Khả thi với Các Bên Liên quan',
    theme: 'Stakeholder Management & Expectations',
    aiPersonaRole: 'Laura - Giám đốc Khách hàng (Client Account Manager)',
    userRole: 'Trưởng nhóm Kỹ thuật đàm phán giãn tiến độ thêm 3 ngày để kiểm thử kỹ lưỡng',
    scenarioDescription: 'Khách hàng muốn đẩy sớm ngày nghiệm thu nhưng bạn biết nếu ép tiến độ sẽ ảnh hưởng đến độ an toàn và chất lượng.',
    roleplayGoal: 'Giải thích lý do kỹ thuật và đề xuất mốc bàn giao khả thi.',
    greetingEn: 'The client is asking if we can move the delivery date up to this Wednesday. Is that doable for your team?',
    greetingVi: 'Khách hàng đang hỏi liệu chúng ta có thể đẩy sớm ngày bàn giao lên thứ Tư tuần này không. Đội của bạn có làm kịp không?',
    suggestedA2: 'Wednesday is too fast. We need until Friday to test everything carefully.',
    suggestedB1: "Wednesday would be a bit of a stretch if we want to complete full load testing. However, we can deliver a rock-solid result by Friday noon.",
    chunks: [
      ['a bit of a stretch', '/ə bɪt əv ə strɛtʃ/', 'Hơi quá sức / Khó khả thi nếu ép quá gấp', 'Finishing the entire audit by tomorrow is a bit of a stretch.', 'Hoàn thành toàn bộ việc kiểm định vào ngày mai là hơi quá sức.', 'Cách từ chối khéo không nói chữ "No".'],
      ['manage expectations', '/ˈmænɪdʒ ˌɛkspɛkˈteɪʃənz/', 'Quản trị kỳ vọng của khách hàng/cấp trên', 'It is better to be transparent and manage expectations early.', 'Tốt hơn hết là minh bạch và quản trị kỳ vọng ngay từ đầu.', 'Tư duy quản trị chuyên nghiệp.'],
      ['deliver a rock-solid result', '/dɪˈlɪvər ə rɑːk ˈsɑːlɪd rɪˈzʌlt/', 'Bàn giao kết quả vững chắc, chuẩn chỉ 100%', 'An extra two days allows us to deliver a rock-solid result.', 'Thêm hai ngày giúp chúng tôi bàn giao một kết quả chuẩn chỉ.', 'Tạo niềm tin lớn.'],
    ],
  },
  {
    day: 34,
    titleEn: 'Giving Constructive Feedback to a Junior Colleague',
    titleVi: 'Góp ý Xây dựng & Huấn luyện Nhân sự Trẻ',
    theme: 'People Management & Coaching',
    aiPersonaRole: 'Liam - Kỹ sư Trẻ mới gia nhập dự án',
    userRole: 'Tiền bối/Quản lý góp ý về bản vẽ/báo cáo của nhân viên trẻ một cách khích lệ',
    scenarioDescription: 'Liam nộp báo cáo rất nhanh nhưng còn sót một vài thông số kiểm định an toàn. Bạn cần khen ngợi sự nhiệt tình trước khi chỉ ra điểm cần bổ sung.',
    roleplayGoal: 'Áp dụng nghệ thuật khen trước – góp ý sau để nhân viên tâm phục khẩu phục.',
    greetingEn: 'Hi! Did you get a chance to look over my draft report for the site inspection?',
    greetingVi: 'Chào anh/chị! Anh/chị đã có dịp xem qua bản nháp báo cáo kiểm tra công trường của em chưa ạ?',
    suggestedA2: 'Yes, you wrote it very fast! Just please add more details about the safety check.',
    suggestedB1: "I did! First off, great job getting the draft ready ahead of schedule. To make it even stronger, let's flesh out the safety compliance section a bit more.",
    chunks: [
      ['first off, great job on...', '/fɜːrst ɔːf ɡreɪt dʒɑːb ɑːn/', 'Trước tiên, khen ngợi bạn đã làm rất tốt phần...', 'First off, great job on organizing the technical drawings.', 'Trước tiên, khen ngợi bạn đã sắp xếp các bản vẽ kỹ thuật rất gọn gàng.', 'Mở đầu buổi góp ý tích cực.'],
      ['flesh out the details', '/flɛʃ aʊt ðə ˈdiːteɪlz/', 'Bổ sung thêm chi tiết cụ thể cho đầy đặn', "Let's flesh out the risk assessment table before sending it to the client.", 'Hãy bổ sung chi tiết hơn cho bảng đánh giá rủi ro trước khi gửi khách hàng nhé.', 'Cụm động từ B1+ rất hay.'],
      ['on the right track', '/ɑːn ðə raɪt træk/', 'Đang đi đúng hướng rồi', "You're definitely on the right track with this design.", 'Bạn chắc chắn đang đi đúng hướng với thiết kế này rồi.', 'Khích lệ cấp dưới.'],
    ],
  },
  {
    day: 35,
    titleEn: 'Receiving Critique Gracefully & Taking Ownership',
    titleVi: 'Đón nhận Phản hồi Chuyên nghiệp & Tinh thần Trách nhiệm',
    theme: 'Professional Maturity & Accountability',
    aiPersonaRole: 'Director Carter - Giám đốc Khối Dự án',
    userRole: 'Quản lý dự án tiếp nhận góp ý của cấp trên về việc trình bày báo cáo ngắn gọn hơn',
    scenarioDescription: 'Giám đốc góp ý rằng bản thuyết trình của bạn có đầy đủ dữ liệu nhưng hơi nhiều chữ, cần tóm tắt thành các gạch đầu dòng trực quan hơn cho Ban Tổng giám đốc.',
    roleplayGoal: 'Cảm ơn lời góp ý chân thành, nhận trách nhiệm chỉnh sửa và hẹn giờ gửi lại bản mới.',
    greetingEn: 'Your technical data is very thorough, but the slides are a bit too text-heavy for the executive board. Can we simplify them?',
    greetingVi: 'Số liệu kỹ thuật của bạn rất kỹ lưỡng, nhưng các trang chiếu hơi nhiều chữ đối với Hội đồng quản trị. Chúng ta làm gọn lại được không?',
    suggestedA2: 'Thank you for your feedback. I will make the slides shorter and send them back to you.',
    suggestedB1: "That's a very fair point, Carter. Thanks for pointing that out—I'll condense the text into visual charts and get the revised deck to you by 3 PM.",
    chunks: [
      ['that is a fair point', '/ðæt ɪz ə fɛr pɔɪnt/', 'Đó là một nhận xét rất xác đáng', "That's a fair point—let's adjust the layout right away.", 'Đó là một góp ý rất xác đáng—hãy chỉnh lại bố cục ngay.', 'Thể hiện bản lĩnh điềm tĩnh của người trưởng thành.'],
      ['take full ownership of...', '/teɪk fʊl ˈoʊnərʃɪp ʌv/', 'Nhận toàn bộ trách nhiệm phụ trách việc...', 'I take full ownership of the oversight and have already fixed it.', 'Tôi nhận trách nhiệm về sơ suất đó và đã khắc phục xong.', 'Tác phong lãnh đạo.'],
      ['condense into key bullet points', '/kənˈdɛns ˈɪntu kiː ˈbʊlɪt pɔɪnts/', 'Cô đọng lại thành các ý chính ngắn gọn', "I'll condense the 10-page report into key bullet points.", 'Tôi sẽ cô đọng báo cáo 10 trang thành các ý chính ngắn gọn.', 'Kỹ năng truyền thông công sở.'],
    ],
  },
  {
    day: 36,
    titleEn: 'Networking at an International Industry Expo',
    titleVi: 'Kết nối Đối tác tại Triển lãm Công nghiệp Quốc tế',
    theme: 'B2B Partnership & Industry Trends',
    aiPersonaRole: 'Henrik - Giám đốc Giải pháp Năng lượng Bắc Âu',
    userRole: 'Chuyên gia Việt Nam trao đổi cơ hội hợp tác kỹ thuật và cung ứng',
    scenarioDescription: 'Bạn gặp Henrik tại gian hàng triển lãm năng lượng tái tạo và cơ khí hàng hải. Hai bên trao đổi danh thiếp và tìm hiểu năng lực của nhau.',
    roleplayGoal: 'Giới thiệu thế mạnh của doanh nghiệp bạn và hẹn lịch trao đổi sâu hơn sau triển lãm.',
    greetingEn: "Thanks for stopping by our booth! Are you working in the offshore energy or marine fabrication sector as well?",
    greetingVi: 'Cảm ơn bạn đã ghé thăm gian hàng của chúng tôi! Bạn cũng đang hoạt động trong lĩnh vực năng lượng ngoài khơi hay chế tạo hàng hải phải không?',
    suggestedA2: 'Yes, I work in this industry in Vietnam. Let us keep in touch via email.',
    suggestedB1: "Yes, indeed! My focus is on industrial safety compliance and offshore fabrication in Vietnam. I'd love to exchange cards and explore potential synergies.",
    chunks: [
      ['explore potential synergies', '/ɪkˈsplɔːr pəˈtɛnʃəl ˈsɪnərdʒiz/', 'Tìm kiếm cơ hội hợp tác cộng hưởng giữa hai bên', "Let's set up a call next week to explore potential synergies.", 'Hãy hẹn một cuộc gọi vào tuần tới để tìm hiểu cơ hội hợp tác giữa hai bên.', 'Cụm từ đắt giá bậc nhất khi đi hội thảo B2B.'],
      ['follow up via LinkedIn / email', '/ˈfɑːloʊ ʌp ˈviːə ˈiːmeɪl/', 'Liên hệ lại sau qua LinkedIn hoặc Email', "I'll send you a quick note to follow up via email tomorrow.", 'Ngày mai tôi sẽ gửi tin nhắn liên hệ lại với bạn qua email nhé.', 'Quy trình kết nối chuyên nghiệp.'],
      ['specialize in...', '/ˈspɛʃəˌlaɪz ɪn/', 'Chuyên sâu về lĩnh vực...', 'Our team specializes in high-standard offshore steel structures.', 'Đội ngũ chúng tôi chuyên sâu về kết cấu thép ngoài khơi tiêu chuẩn cao.', 'Giới thiệu năng lực cốt lõi.'],
    ],
  },
  {
    day: 37,
    titleEn: 'Workplace Safety Briefing & Toolbox Talk (HSE)',
    titleVi: 'Họp Phổ biến An toàn Lao động Đầu ca (Toolbox Talk & HSE)',
    theme: 'Industrial Safety Compliance & Hazard Awareness',
    aiPersonaRole: 'Inspector Miller - Chuyên gia Giám sát An toàn Quốc tế (HSE Advisor)',
    userRole: 'Quản lý/Kỹ sư phụ trách kiểm tra an toàn giàn giáo và khóa nguồn điện',
    scenarioDescription: 'Trước khi bắt đầu ca làm việc trên cao và bảo trì hệ thống điện, bạn trao đổi với chuyên gia HSE về quy trình Giấy phép làm việc (Permit to Work) và Khóa/Gắn thẻ cảnh báo (Lockout/Tagout).',
    roleplayGoal: 'Xác nhận toàn bộ nhân sự đã trang bị bảo hộ (PPE), kiểm tra giàn giáo chuẩn mực và cô lập nguồn điện an toàn.',
    greetingEn: 'Morning! Before we sign off on the Permit to Work for today, have we completed the scaffolding inspection and electrical isolation?',
    greetingVi: 'Chào buổi sáng! Trước khi chúng ta ký duyệt Giấy phép làm việc hôm nay, đội đã hoàn tất kiểm tra giàn giáo và cô lập nguồn điện chưa?',
    suggestedA2: 'Yes, the scaffolding is safe and we locked the power switch.',
    suggestedB1: "Morning Miller! Everything is strictly compliant—the scaffolding has been green-tagged, and full Lockout/Tagout procedures are in place before anyone steps on site.",
    chunks: [
      ['strictly compliant with standards', '/ˈstrɪktli kəmˈplaɪənt wɪð ˈstændərdz/', 'Tuân thủ nghiêm ngặt các tiêu chuẩn quy định', 'Our scaffolding setup is strictly compliant with BS1139 standards.', 'Hệ thống giàn giáo của chúng tôi tuân thủ nghiêm ngặt tiêu chuẩn BS1139.', 'Cụm từ chuyên ngành an toàn công nghiệp cực chuẩn.'],
      ['put Lockout/Tagout in place', '/pʊt ˈlɑːkaʊt ˈtæɡaʊt ɪn pleɪs/', 'Thực hiện quy trình Khóa và Gắn thẻ cảnh báo nguồn năng lượng', 'Make sure Lockout/Tagout is in place before touching the control panel.', 'Đảm bảo đã thực hiện Khóa và Gắn thẻ cảnh báo trước khi chạm vào tủ điện.', 'Thuật ngữ sống còn trong an toàn điện/cơ khí.'],
      ['identify potential hazards', '/aɪˈdɛntəˌfaɪ pəˈtɛnʃəl ˈhæzərdz/', 'Nhận diện sớm các mối nguy tiềm ẩn tại hiện trường', 'Our daily toolbox talk helps the crew identify potential hazards.', 'Buổi họp an toàn đầu ca giúp anh em nhận diện các mối nguy tiềm ẩn.', 'Văn hóa an toàn chủ động (Zero Harm).'],
    ],
  },
  {
    day: 38,
    titleEn: 'Coordinating Business Travel & Site Visit Itineraries',
    titleVi: 'Điều phối Lịch trình Công tác & Khảo sát Nhà máy/Công trường',
    theme: 'Corporate Logistics & Site Inspections',
    aiPersonaRole: 'Monica - Điều phối viên Dự án tại Singapore',
    userRole: 'Chuyên gia sắp xếp lịch đón đoàn khách quốc tế sang khảo sát thực địa',
    scenarioDescription: 'Đoàn chuyên gia nước ngoài sắp bay sang Việt Nam để khảo sát xưởng chế tạo. Bạn thống nhất lịch trình đón sân bay, trang bị đồ bảo hộ và lịch họp.',
    roleplayGoal: 'Xác nhận giờ hạ cánh, phương tiện đưa đón xuống nhà máy và cỡ giày/áo bảo hộ cho khách.',
    greetingEn: 'Hi! Our engineering delegation lands next Tuesday at 9 AM. How does the schedule for the site visit look?',
    greetingVi: 'Chào bạn! Phái đoàn kỹ sư của chúng tôi sẽ hạ cánh lúc 9 giờ sáng thứ Ba tới. Lịch trình cho chuyến khảo sát nhà máy được sắp xếp thế nào rồi?',
    suggestedA2: 'Our car will pick you up at the airport and take you to the factory. Please tell me your shoe sizes.',
    suggestedB1: "Everything is all set! We've arranged a private shuttle from the airport straight to the fabrication yard—by the way, could you send over the team's PPE and safety boot sizes?",
    chunks: [
      ['everything is all set', '/ˈɛvriθɪŋ ɪz ɔːl sɛt/', 'Mọi thứ đã được chuẩn bị sẵn sàng đâu vào đấy', 'Everything is all set for tomorrow’s client visit.', 'Mọi thứ đã sẵn sàng cho chuyến thăm của khách hàng ngày mai.', 'Tạo sự yên tâm tuyệt đối.'],
      ['arrange a private shuttle', '/əˈreɪndʒ ə ˈpraɪvət ˈʃʌtəl/', 'Sắp xếp xe đưa đón riêng cho đoàn', 'We arranged a private shuttle to pick your team up.', 'Chúng tôi đã bố trí xe riêng đón đoàn của bạn.', 'Chu đáo, chuyên nghiệp.'],
      ['send over the details', '/sɛnd ˈoʊvər ðə ˈdiːteɪlz/', 'Chuyển thông tin chi tiết sang giúp tôi', 'Could you send over their passport details for site clearance?', 'Bạn gửi giúp thông tin hộ chiếu của đoàn để làm thủ tục ra vào cảng/xưởng nhé?', 'Cụm động từ công sở rất tự nhiên.'],
    ],
  },
  {
    day: 39,
    titleEn: 'Senior Job Interview: Highlighting Experience & Leadership',
    titleVi: 'Phỏng vấn Cấp Quản lý/Chuyên gia: Khẳng định Năng lực Thực chiến',
    theme: 'Career Advancement & Executive Branding',
    aiPersonaRole: 'Richard - Giám đốc Nhân sự Khu vực Châu Á - Thái Bình Dương',
    userRole: 'Ứng viên cấp Senior/Manager trình bày thế mạnh kinh nghiệm 10+ năm',
    scenarioDescription: 'Bạn tham gia vòng phỏng vấn cho vị trí Quản lý Cấp cao tại một tập đoàn đa quốc gia. Nhà tuyển dụng hỏi về giá trị cốt lõi bạn mang lại.',
    roleplayGoal: 'Nêu bật kinh nghiệm thực chiến, khả năng dẫn dắt đội ngũ và giải quyết vấn đề dưới áp lực cao.',
    greetingEn: 'Looking at your impressive track record over the last decade, what would you say is your greatest strength as a leader?',
    greetingVi: 'Nhìn vào bề dày thành tích ấn tượng của bạn trong hơn một thập kỷ qua, bạn đánh giá đâu là điểm mạnh lớn nhất của mình ở vai trò người dẫn dắt?',
    suggestedA2: 'I have over 10 years of experience and I always help my team work safely and on time.',
    suggestedB1: 'Over the past decade, my core strength has been bridging the gap between technical execution and safety compliance while keeping teams calm under pressure.',
    chunks: [
      ['proven track record', '/ˈpruːvən træk ˈrɛkərd/', 'Bề dày thành tích đã được chứng minh qua thực tế', 'I have a proven track record of delivering complex projects on time.', 'Tôi có bề dày thành tích thực tế trong việc bàn giao các dự án phức tạp đúng hạn.', 'Cụm từ số 1 trong phỏng vấn cấp cao.'],
      ['bridge the gap between...', '/brɪdʒ ðə ɡæp bɪˈtwiːn/', 'Làm cầu nối thu hẹp khoảng cách giữa...', 'My role is to bridge the gap between foreign clients and local engineers.', 'Vai trò của tôi là làm cầu nối giữa khách hàng nước ngoài và đội ngũ kỹ sư trong nước.', 'Định vị giá trị bản thân cực kỳ đắt giá.'],
      ['thrive under pressure', '/θraɪv ˈʌndər ˈprɛʃər/', 'Phát huy năng lực mạnh mẽ ngay cả dưới áp lực cao', 'Our team knows how to stay focused and thrive under pressure.', 'Đội ngũ của chúng tôi biết cách giữ tập trung và bứt phá dưới áp lực cao.', 'Thể hiện bản lĩnh tuổi 30–40.'],
    ],
  },
  {
    day: 40,
    titleEn: 'Handling Client Complaints with Empathy & Action',
    titleVi: 'Hóa giải Khiếu nại của Khách hàng bằng Sự Thấu cảm & Giải pháp',
    theme: 'Client Retention & Service Recovery',
    aiPersonaRole: 'Mr. Vance - Khách hàng khó tính đang không hài lòng về một lô hàng',
    userRole: 'Quản lý phụ trách lắng nghe, nhận trách nhiệm và đưa phương án khắc phục ngay',
    scenarioDescription: 'Khách hàng phản ánh một số tài liệu chứng chỉ kỹ thuật gửi kèm lô hàng bị thiếu chữ ký xác nhận. Bạn cần xoa dịu khách và giải quyết dứt điểm.',
    roleplayGoal: 'Lắng nghe không đổ lỗi, xin lỗi chuyên nghiệp và cam kết gửi bản bổ sung trong vòng 2 giờ.',
    greetingEn: "I'm quite frustrated! We received the shipment this morning, but two of the quality inspection certificates are missing signatures.",
    greetingVi: 'Tôi đang khá bức xúc đây! Sáng nay chúng tôi nhận được lô hàng nhưng có tới hai chứng chỉ kiểm định chất lượng bị thiếu chữ ký xác nhận.',
    suggestedA2: 'I am very sorry about this mistake. I will get the signatures and send them to you in two hours.',
    suggestedB1: "I completely understand your frustration, Mr. Vance, and I apologize for the oversight. I'm making this my top priority and will email the signed certificates within two hours.",
    chunks: [
      ['apologize for the oversight', '/əˈpɑːləˌdʒaɪz fɔːr ði ˈoʊvərˌsaɪt/', 'Xin lỗi vì sự sơ suất trong khâu kiểm soát', 'We sincerely apologize for the administrative oversight.', 'Chúng tôi chân thành xin lỗi vì sự sơ suất trong khâu hành chính này.', 'Chuyên nghiệp hơn nhiều so với "sorry for my mistake".'],
      ['make this my top priority', '/meɪk ðɪs maɪ tɑːp praɪˈɔːrəti/', 'Đặt việc này lên ưu tiên giải quyết số 1 của tôi', "Rest assured, I'm making this my top priority right now.", 'Xin ngài yên tâm, tôi đang đặt việc này làm ưu tiên giải quyết số 1 ngay lúc này.', 'Xoa dịu khách hàng tức thì.'],
      ['rectify the situation', '/ˈrɛktəˌfaɪ ðə ˌsɪtʃuˈeɪʃən/', 'Khắc phục triệt để tình hình', 'We have taken immediate steps to rectify the situation.', 'Chúng tôi đã thực hiện các bước tức thời để khắc phục triệt để tình hình.', 'Ngôn ngữ quản trị chuẩn B1+.',],
    ],
  },
  {
    day: 41,
    titleEn: 'Brainstorming Digital Transformation & AI Adoption',
    titleVi: 'Thảo luận Ứng dụng Trí tuệ Nhân tạo (AI) vào Đào tạo & Công việc',
    theme: 'Future of Work & Technological Agility',
    aiPersonaRole: 'Sophia - Trưởng phòng Đổi mới Sáng tạo (Innovation Lead)',
    userRole: 'Chuyên gia đề xuất dùng video mô phỏng 4K bằng AI cho đào tạo an toàn nội bộ',
    scenarioDescription: 'Trong cuộc họp sáng kiến, bạn đề xuất sử dụng công nghệ tạo video AI trực quan để mô phỏng các tình huống an toàn lao động thay vì chỉ đọc tài liệu chữ khô khan.',
    roleplayGoal: 'Thuyết phục đội ngũ về tính trực quan và hiệu quả ghi nhớ của video mô phỏng.',
    greetingEn: 'We need a more engaging way to train our staff on workplace safety this year. Do you have any fresh ideas?',
    greetingVi: 'Năm nay chúng ta cần một phương pháp thu hút hơn để đào tạo nhân sự về an toàn lao động. Bạn có ý tưởng mới mẻ nào không?',
    suggestedA2: 'We can use AI to make realistic safety videos so workers can see the hazards clearly.',
    suggestedB1: "What if we leverage AI video generation to create realistic 4K hazard simulations? Visual storytelling is far more effective than dry text manuals!",
    chunks: [
      ['leverage new technology', '/ˈlɛvərɪdʒ nuː tɛkˈnɑːlədʒi/', 'Tận dụng đòn bẩy công nghệ mới', 'We can leverage AI tools to visualize complex safety scenarios.', 'Chúng ta có thể tận dụng công cụ AI để trực quan hóa các kịch bản an toàn phức tạp.', 'Động từ "leverage" rất được ưa chuộng trong giới quản lý.'],
      ['a game-changing approach', '/ə ɡeɪm ˈtʃeɪndʒɪŋ əˈproʊtʃ/', 'Một cách tiếp cận mang tính đột phá', 'Using realistic 4K video loops is a game-changing approach to training.', 'Sử dụng các đoạn video 4K chân thực là cách tiếp cận đột phá trong đào tạo.', 'Thuyết phục ban giám đốc.'],
      ['boost retention rates', '/buːst rɪˈtɛnʃən reɪts/', 'Tăng tỷ lệ ghi nhớ kiến thức của học viên/nhân sự', 'Visual training drastically boosts knowledge retention rates.', 'Đào tạo trực quan giúp tăng mạnh tỷ lệ ghi nhớ kiến thức.', 'Dùng số liệu và lợi ích để thuyết phục.'],
    ],
  },
  {
    day: 42,
    titleEn: 'Raising Red Flags Early in a Daily Standup',
    titleVi: 'Cảnh báo Sớm Rủi ro trong Cuộc họp Giao ban Ngắn (Daily Standup)',
    theme: 'Agile Communication & Proactive Risk Management',
    aiPersonaRole: 'Scrum Master / Project Lead Alex',
    userRole: 'Thành viên chủ động nêu vướng mắc về nguồn cung vật tư để cả đội hỗ trợ',
    scenarioDescription: 'Trong cuộc họp giao ban 10 phút buổi sáng, bạn cập nhật nhanh việc đã làm xong hôm qua và cảnh báo sớm việc nhà cung cấp giao chậm một thiết bị quan trọng.',
    roleplayGoal: 'Báo cáo ngắn gọn trong 30 giây và nêu rõ điểm cần hỗ trợ (blocker).',
    greetingEn: 'Morning team! Let’s do a quick round-robin update. How are things progressing on your end, and are there any blockers?',
    greetingVi: 'Chào buổi sáng cả đội! Hãy cập nhật nhanh vòng quanh nhé. Công việc phía bạn tiến triển thế nào rồi, có vướng mắc gì cần tháo gỡ không?',
    suggestedA2: 'Yesterday I finished the layout. Today I am waiting for the supplier because they are late.',
    suggestedB1: "Morning! Yesterday I wrapped up the layout inspection. Today I'm flagging a potential blocker—our valve supplier is running behind schedule, so we may need to expedite shipping.",
    chunks: [
      ['wrap up the inspection', '/ræp ʌp ði ɪnˈspɛkʃən/', 'Hoàn tất trọn vẹn khâu kiểm tra', 'We wrapped up the phase-one inspection yesterday afternoon.', 'Chiều qua chúng tôi đã hoàn tất trọn vẹn việc kiểm tra giai đoạn 1.', 'Thay cho "finish" trong công sở.'],
      ['flag a potential blocker', '/flæɡ ə pəˈtɛnʃəl ˈblɑːkər/', 'Cảnh báo sớm một điểm nghẽn có thể làm kẹt tiến độ', "I'd like to flag a potential blocker regarding customs clearance.", 'Tôi muốn cảnh báo sớm một điểm nghẽn liên quan đến thủ tục thông quan.', 'Cụm từ chuẩn Agile/Project Management.'],
      ['running behind schedule', '/ˈrʌnɪŋ bɪˈhaɪnd ˈskɛdʒuːl/', 'Đang bị chậm hơn so với tiến độ kế hoạch', 'The subcontractor is running slightly behind schedule.', 'Nhà thầu phụ đang bị chậm hơn một chút so với tiến độ.', 'Cặp từ đối lập với "ahead of schedule".'],
    ],
  },
  {
    day: 43,
    titleEn: 'Explaining Technical Concepts to Non-Technical Clients',
    titleVi: 'Giải thích Vấn đề Kỹ thuật cho Khách hàng Không Chuyên một cách Dễ hiểu',
    theme: 'Clarity, Analogies & Client Advisory',
    aiPersonaRole: 'Ms. Davis - Giám đốc Đầu tư (không có nền tảng kỹ thuật sâu)',
    userRole: 'Chuyên gia Kỹ thuật giải thích lý do cần bảo trì chống ăn mòn định kỳ',
    scenarioDescription: 'Khách hàng thuộc bộ phận tài chính thắc mắc vì sao chi phí sơn phủ chống ăn mòn cho thiết bị ngoài biển lại cao hơn trên đất liền. Bạn cần giải thích dễ hiểu, không dùng quá nhiều thuật ngữ rối rắm.',
    roleplayGoal: 'Dùng hình ảnh so sánh đơn giản để khách hàng hiểu giá trị bảo vệ tuổi thọ công trình.',
    greetingEn: 'To be honest, I’m not an engineer—could you explain in simple terms why this marine coating specification costs 25% more?',
    greetingVi: 'Thực tình tôi không phải dân kỹ thuật—bạn có thể giải thích một cách dễ hiểu vì sao tiêu chuẩn sơn phủ hàng hải này lại đắt hơn 25% không?',
    suggestedA2: 'Because seawater has salt and strong wind, normal paint will break very fast. This paint protects the steel for 15 years.',
    suggestedB1: "Put simply, harsh saltwater eats through standard steel very quickly. Think of this specialized coating as heavy-duty sunscreen for the platform—it costs a bit more upfront but prevents massive repair bills for 15 years.",
    chunks: [
      ['put simply / in plain English', '/pʊt ˈsɪmpli/', 'Nói một cách dễ hiểu là...', 'Put simply, this backup valve acts like a safety fuse for the whole pipeline.', 'Nói một cách dễ hiểu, chiếc van dự phòng này hoạt động như một cầu chì an toàn cho toàn bộ đường ống.', 'Cầu nối tuyệt vời khi nói chuyện với lãnh đạo không chuyên kỹ thuật.'],
      ['think of it as...', '/θɪŋk əv ɪt æz/', 'Hãy hình dung nó giống như là...', 'Think of regular maintenance as an annual health checkup for the machinery.', 'Hãy hình dung việc bảo trì định kỳ giống như khám sức khỏe hàng năm cho máy móc vậy.', 'Kỹ thuật so sánh (analogy) bậc thầy.'],
      ['upfront investment vs long-term savings', '/ˈʌpˌfrʌnt ɪnˈvɛstmənt/', 'Khoản đầu tư ban đầu so với khoản tiết kiệm dài hạn', 'A small upfront investment leads to huge long-term savings.', 'Một khoản đầu tư ban đầu hợp lý sẽ mang lại khoản tiết kiệm khổng lồ về lâu dài.', 'Ngôn ngữ thuyết phục tài chính.'],
    ],
  },
  {
    day: 44,
    titleEn: 'Annual Performance Review & Career Growth Discussion',
    titleVi: 'Đánh giá Hiệu suất Cuối năm & Đề xuất Lộ trình Thăng tiến',
    theme: 'Self-Advocacy & Compensation',
    aiPersonaRole: 'VP Thomas - Phó Chủ tịch Phụ trách Khu vực',
    userRole: 'Quản lý/Chuyên gia tổng kết thành tựu trong năm và đề xuất mở rộng phạm vi trách nhiệm',
    scenarioDescription: 'Trong buổi đánh giá hiệu suất cuối năm (Annual Appraisal), bạn điểm lại các dự án đã hoàn thành xuất sắc và bày tỏ mong muốn đảm nhận vai trò lớn hơn trong năm tới.',
    roleplayGoal: 'Trình bày thành tựu tự tin bằng con số và đề xuất lộ trình phát triển công bằng.',
    greetingEn: 'You’ve had a very strong year leading the local operations! Where do you see yourself growing in the company next year?',
    greetingVi: 'Bạn đã có một năm rất xuất sắc khi dẫn dắt hoạt động vận hành tại địa phương! Bạn định hướng sự phát triển của mình trong công ty vào năm tới như thế nào?',
    suggestedA2: 'Thank you! Next year I want to manage regional projects and improve my team.',
    suggestedB1: "Thank you, Thomas! Given that we exceeded our safety and delivery KPIs by 15% this year, I'm eager to step up and take on regional project oversight in the coming year.",
    chunks: [
      ['exceed our KPIs', '/ɪkˈsiːd ˈaʊər keɪ-piː-aɪz/', 'Vượt chỉ tiêu hiệu suất đề ra', 'Our department exceeded our safety and quality KPIs for three consecutive quarters.', 'Bộ phận của chúng tôi đã vượt chỉ tiêu an toàn và chất lượng trong 3 quý liên tiếp.', 'Dùng khi báo cáo thành tích.'],
      ['step up and take on more responsibility', '/stɛp ʌp ænd teɪk ɑːn/', 'Tiến lên đảm nhận trọng trách lớn hơn', "I'm ready to step up and take on regional leadership responsibilities.", 'Tôi đã sẵn sàng tiến lên đảm nhận các trọng trách quản lý cấp khu vực.', 'Thể hiện khát vọng sự nghiệp.'],
      ['align with my contributions', '/əˈlaɪn wɪð maɪ ˌkɑːntrɪˈbjuːʃənz/', 'Tương xứng với những đóng góp thực tế của tôi', 'I hope we can review a compensation package that aligns with my contributions.', 'Tôi hy vọng chúng ta có thể xem xét mức đãi ngộ tương xứng với những đóng góp của tôi.', 'Đàm phán lương thưởng tinh tế, lịch sự.'],
    ],
  },
  {
    day: 46,
    titleEn: 'Cross-Cultural Communication with Global Teams',
    titleVi: 'Giao tiếp Đa văn hóa khi Làm việc cùng Đối tác Âu – Á',
    theme: 'Global Leadership & Cultural Sensitivity',
    aiPersonaRole: 'Elena - Chuyên gia Nhân sự Toàn cầu',
    userRole: 'Quản lý Việt Nam chia sẻ kinh nghiệm dung hòa phong cách làm việc giữa phương Đông và phương Tây',
    scenarioDescription: 'Bạn thảo luận về cách giúp đội ngũ kỹ sư Việt Nam giao tiếp trực diện, rõ ràng hơn khi họp với các đối tác châu Âu và Bắc Mỹ.',
    roleplayGoal: 'Chia sẻ sự khác biệt văn hóa và cách xây dựng môi trường làm việc cởi mở.',
    greetingEn: 'Working across different time zones and cultures can be tricky. How do you help your local team communicate smoothly with Western partners?',
    greetingVi: 'Làm việc xuyên múi giờ và đa văn hóa đôi khi khá phức tạp. Làm thế nào bạn giúp đội ngũ trong nước giao tiếp trôi chảy với các đối tác phương Tây?',
    suggestedA2: 'I tell my team to speak clearly and ask questions right away if they do not understand.',
    suggestedB1: 'In Vietnam, people are naturally polite and sometimes hesitant to say no directly. I encourage my team to be upfront about challenges so everyone stays on the same page.',
    chunks: [
      ['stay on the same page', '/steɪ ɑːn ðə seɪm peɪdʒ/', 'Hiểu đúng ý nhau / Đồng nhất quan điểm và thông tin', 'A quick summary email helps everyone stay on the same page.', 'Một email tóm tắt nhanh giúp tất cả mọi người nắm thống nhất thông tin.', 'Cụm từ xuất hiện mỗi ngày trong công ty đa quốc gia.'],
      ['be upfront about challenges', '/bi ˈʌpˌfrʌnt əˈbaʊt ˈtʃælɪndʒɪz/', 'Thẳng thắn và minh bạch ngay từ đầu về các khó khăn', 'Western partners appreciate it when we are upfront about technical challenges.', 'Đối tác phương Tây rất trân trọng khi chúng ta thẳng thắn ngay từ đầu về các khó khăn kỹ thuật.', 'Xây dựng lòng tin quốc tế.'],
      ['read between the lines', '/riːd bɪˈtwiːn ðə laɪnz/', 'Hiểu được ẩn ý đằng sau lời nói', 'In cross-cultural meetings, sometimes you have to read between the lines.', 'Trong các cuộc họp đa văn hóa, đôi khi bạn cần tinh ý hiểu được ẩn ý đằng sau lời nói.', 'Thành ngữ B1+ tinh tế.'],
    ],
  },
  {
    day: 47,
    titleEn: 'Vendor & Subcontractor Management',
    titleVi: 'Làm việc với Nhà cung cấp & Quản lý Chất lượng Nhà thầu phụ',
    theme: 'Supply Chain & Quality Assurance',
    aiPersonaRole: 'Carlos - Đại diện Nhà cung cấp Thiết bị Công nghiệp',
    userRole: 'Quản lý Mua hàng / Kỹ thuật yêu cầu nhà cung cấp đảm bảo chứng chỉ vật liệu',
    scenarioDescription: 'Bạn trao đổi với nhà cung cấp vật tư để làm rõ tiêu chuẩn kiểm định chất lượng và thời gian giao hàng tới chân công trình.',
    roleplayGoal: 'Yêu cầu đầy đủ chứng chỉ xuất xứ/chất lượng (CO/CQ) và cam kết phạt nếu giao trễ.',
    greetingEn: 'We are ready to ship the steel pipes and valves next Monday. Are there any final documents your QA team needs from us?',
    greetingVi: 'Chúng tôi đã sẵn sàng xuất xưởng lô ống thép và van vào thứ Hai tới. Đội Kiểm soát chất lượng (QA) của bạn có cần thêm chứng từ cuối cùng nào từ chúng tôi không?',
    suggestedA2: 'Yes, please send all quality certificates before the truck arrives at our site.',
    suggestedB1: 'Before you dispatch the shipment, please make sure all mill test certificates and traceability docs are uploaded—our QA team has zero tolerance for missing paperwork.',
    chunks: [
      ['dispatch the shipment', '/dɪˈspætʃ ðə ˈʃɪpmənt/', 'Xuất kho / Gửi lô hàng đi', 'Please notify us 24 hours before you dispatch the shipment.', 'Vui lòng thông báo cho chúng tôi 24 giờ trước khi xuất lô hàng đi.', 'Thuật ngữ Logistics chuẩn.'],
      ['zero tolerance for...', '/ˈzɪroʊ ˈtɑːlərəns fɔːr/', 'Tuyệt đối không nhân nhượng với...', 'We have zero tolerance for safety violations or counterfeit materials.', 'Chúng tôi tuyệt đối không nhân nhượng với các vi phạm an toàn hoặc vật tư không rõ nguồn gốc.', 'Thể hiện sự nghiêm minh trong công việc.'],
      ['meet the exact specifications', '/miːt ði ɪɡˈzækt ˌspɛsəfɪˈkeɪʃənz/', 'Đáp ứng chính xác các thông số kỹ thuật yêu cầu', 'Every single component must meet the exact specifications.', 'Từng linh kiện một đều phải đáp ứng chính xác thông số kỹ thuật.', 'Viết tắt là "meet the specs".'],
    ],
  },
  {
    day: 48,
    titleEn: 'Writing & Following Up on High-Impact Emails',
    titleVi: 'Thảo luận Nội dung Email Quan trọng & Đôn đốc Phản hồi',
    theme: 'Executive Correspondence & Follow-ups',
    aiPersonaRole: 'Rachel - Đồng nghiệp Phối hợp Liên phòng ban',
    userRole: 'Chuyên gia gọi điện đôn đốc nhẹ nhàng một email phê duyệt đang chờ chữ ký',
    scenarioDescription: 'Bạn đã gửi email xin phê duyệt bản vẽ/ngân sách từ 3 ngày trước nhưng bộ phận liên quan chưa phản hồi. Bạn gọi trực tiếp để nhắc khéo.',
    roleplayGoal: 'Nhắc khéo về email đang chờ duyệt mà vẫn giữ thái độ hợp tác, vui vẻ.',
    greetingEn: 'Hi! Sorry my inbox has been flooded this week. Were you calling about the budget approval email?',
    greetingVi: 'Chào bạn! Xin lỗi tuần này hộp thư của tôi bị quá tải. Có phải bạn gọi về email phê duyệt ngân sách không?',
    suggestedA2: 'Yes! We need your approval today so we can start the work tomorrow.',
    suggestedB1: "No worries at all, I know how crazy this week has been! I just wanted to gently follow up on that approval so we can keep the ball rolling for tomorrow's kickoff.",
    chunks: [
      ['gently follow up on...', '/ˈdʒɛntli ˈfɑːloʊ ʌp ɑːn/', 'Nhắc khéo / Đôn đốc nhẹ nhàng về việc...', "I'm just calling to gently follow up on the contract review.", 'Tôi gọi để đôn đốc nhẹ nhàng về việc rà soát hợp đồng.', 'Lịch sự, không gây cảm giác hối thúc khó chịu.'],
      ['keep the ball rolling', '/kiːp ðə bɔːl ˈroʊlɪŋ/', 'Giữ cho tiến độ công việc tiếp tục lăn bánh trôi chảy', 'Your sign-off today will help us keep the ball rolling.', 'Chữ ký phê duyệt của bạn hôm nay sẽ giúp chúng tôi giữ cho công việc trôi chảy.', 'Thành ngữ công sở cực kỳ thông dụng.'],
      ['at your earliest convenience', '/æt jʊr ˈɜːrliəst kənˈviːnjəns/', 'Ngay khi bạn thu xếp được thời gian sớm nhất', 'Could you please review and sign the document at your earliest convenience?', 'Nhờ bạn xem và ký duyệt tài liệu ngay khi thuận tiện sớm nhất nhé?', 'Cụm từ vàng trong cả nói lẫn viết email.'],
    ],
  },
  {
    day: 49,
    titleEn: 'Site Handover & Final Quality Walkthrough',
    titleVi: 'Nghiệm thu Thực địa & Bàn giao Hạng mục Hoàn thành',
    theme: 'Commissioning & Final Sign-off',
    aiPersonaRole: 'Lead Inspector Evans - Trưởng đoàn Nghiệm thu của Chủ đầu tư',
    userRole: 'Chỉ huy công trường / Trưởng nhóm dự án dẫn đoàn đi nghiệm thu bước cuối',
    scenarioDescription: 'Bạn dẫn đại diện Chủ đầu tư đi kiểm tra thực tế hạng mục vừa hoàn thiện để ký biên bản nghiệm thu bàn giao (Handover Certificate).',
    roleplayGoal: 'Trình bày các điểm đã kiểm thử thành công và ghi nhận các chỉnh sửa nhỏ cuối cùng (punch list).',
    greetingEn: 'The installation looks very clean! Have all the pressure tests and safety checks been signed off?',
    greetingVi: 'Phần lắp đặt trông rất gọn gàng và chuẩn chỉ! Tất cả các bài kiểm tra áp lực và an toàn đều đã được ký xác nhận hết chưa?',
    suggestedA2: 'Yes, all tests passed 100%. Here is the final report for you to sign.',
    suggestedB1: "Thank you, Evans! All pressure tests passed with zero leaks, and we've cleared every item on the punch list. We're ready for the final sign-off whenever you are.",
    chunks: [
      ['clear the punch list', '/klɪr ðə pʌntʃ lɪst/', 'Hoàn tất xử lý toàn bộ danh mục các lỗi nhỏ tồn đọng', 'Our crew worked overtime to clear the entire punch list before handover.', 'Đội ngũ chúng tôi đã tăng ca để xử lý dứt điểm toàn bộ danh mục tồn đọng trước khi bàn giao.', 'Thuật ngữ thực chiến trong xây dựng, cơ khí, dự án.'],
      ['ready for final sign-off', '/ˈrɛdi fɔːr ˈfaɪnəl ˈsaɪnˌɔːf/', 'Sẵn sàng cho bước ký nghiệm thu cuối cùng', 'The system is fully tested and ready for final sign-off.', 'Hệ thống đã được kiểm thử toàn diện và sẵn sàng để ký nghiệm thu cuối cùng.', 'Chuyên nghiệp, đĩnh đạc.'],
      ['up to code / up to standard', '/ʌp tə koʊd/', 'Đạt chuẩn quy phạm kỹ thuật hiện hành', 'Every weld and electrical connection is 100% up to code.', 'Mỗi mối hàn và đấu nối điện đều đạt chuẩn quy phạm 100%.', 'Ngắn gọn mà đầy sức nặng.'],
    ],
  },
  {
    day: 50,
    titleEn: 'Delegating Tasks & Empowering Your Team',
    titleVi: 'Phân quyền Giao việc & Trao quyền Chủ động cho Đội ngũ',
    theme: 'Leadership & Team Empowerment',
    aiPersonaRole: 'Minh - Chuyên viên Cấp dưới đang nhận bàn giao một mảng việc mới',
    userRole: 'Người quản lý giao việc rõ ràng mà không săm soi tiểu tiết (micromanage)',
    scenarioDescription: 'Ở tuổi 30–40, bạn chuyển dần từ người trực tiếp làm mọi thứ sang người phân công và định hướng. Bạn giao một hạng mục quan trọng cho nhân sự tiềm năng.',
    roleplayGoal: 'Nêu rõ kết quả đầu ra mong đợi, truyền sự tin tưởng và mở đường cho nhân viên hỏi khi cần.',
    greetingEn: 'Thanks for trusting me with the client presentation next week! How closely do you want to review my slides?',
    greetingVi: 'Cảm ơn anh/chị đã tin tưởng giao cho em bài thuyết trình với khách hàng tuần tới! Anh/chị muốn kiểm duyệt các trang chiếu của em ở mức độ chi tiết nào ạ?',
    suggestedA2: 'I trust you! Just show me the main outline on Wednesday, and you can do the rest.',
    suggestedB1: "I have full confidence in you, so I won't micromanage! Just run the main outline by me on Wednesday, and feel free to reach out if you hit any roadblocks.",
    chunks: [
      ['avoid micromanaging', '/əˈvɔɪd ˈmaɪkroʊˌmænɪdʒɪŋ/', 'Tránh việc quản lý vi mô / săm soi từng tiểu tiết', 'Good leaders set clear goals and avoid micromanaging their people.', 'Người lãnh đạo giỏi đặt mục tiêu rõ ràng và tránh săm soi tiểu tiết của nhân viên.', 'Tư duy quản trị hiện đại.'],
      ['run the outline by me', '/rʌn ði ˈaʊtˌlaɪn baɪ miː/', 'Đưa đề cương qua để tôi xem lướt và góp ý nhanh', 'Just run the rough outline by me before you finalize the report.', 'Cứ đưa đề cương sơ bộ qua cho tôi xem lướt trước khi bạn chốt báo cáo nhé.', 'Cấu trúc "run [something] by [someone]" cực kỳ tự nhiên.'],
      ['hit a roadblock', '/hɪt ə ˈroʊdˌblɑːk/', 'Gặp phải chướng ngại vật / vướng mắc khó gỡ', 'If you hit a roadblock with the data, my door is always open.', 'Nếu bạn gặp vướng mắc với phần dữ liệu, cửa phòng tôi luôn rộng mở hỗ trợ.', 'Thân thiện, tạo tâm lý an toàn cho cấp dưới.'],
    ],
  },
  {
    day: 51,
    titleEn: 'Onboarding an International Specialist to Your Site',
    titleVi: 'Đón tiếp & Hướng dẫn Chuyên gia Quốc tế Mới Nhận nhiệm vụ',
    theme: 'Team Integration & Site Orientation',
    aiPersonaRole: 'Anders - Chuyên gia Kỹ thuật người Đan Mạch vừa sang nhận việc tại dự án',
    userRole: 'Quản lý tại Việt Nam hướng dẫn tổng quan về quy trình làm việc và văn hóa đội nhóm',
    scenarioDescription: 'Anders là chuyên gia nước ngoài mới sang làm việc cùng đội của bạn trong 6 tháng. Bạn đón tiếp và giới thiệu quy trình phối hợp hàng ngày.',
    roleplayGoal: 'Chào đón nồng nhiệt, tóm tắt nhịp họp giao ban buổi sáng và quy định an toàn.',
    greetingEn: 'Good morning! It’s my first official day on site here in Vietnam. Everything looks very dynamic!',
    greetingVi: 'Chào buổi sáng! Hôm nay là ngày làm việc chính thức đầu tiên của tôi tại công trường ở Việt Nam. Mọi thứ trông thật năng động!',
    suggestedA2: 'Welcome to Vietnam, Anders! Let me show you our office and introduce you to the team.',
    suggestedB1: "Welcome aboard, Anders! We're thrilled to have your expertise on the team. Let me walk you through our daily safety routines and get you up to speed on the project.",
    chunks: [
      ['welcome aboard!', '/ˈwɛlkəm əˈbɔːrd/', 'Chào mừng gia nhập đội ngũ / con tàu chung của chúng ta!', 'Welcome aboard! Everyone is excited to work with you.', 'Chào mừng bạn gia nhập đội ngũ! Mọi người đều rất hào hứng được làm việc cùng bạn.', 'Câu chào chuẩn mực nhất cho thành viên mới.'],
      ['get you up to speed', '/ɡɛt juː ʌp tə spiːd/', 'Giúp bạn nắm bắt nhanh toàn bộ thông tin/tiến độ hiện tại', "I'll spend an hour this morning to get you up to speed on Phase 2.", 'Sáng nay tôi sẽ dành một giờ để giúp bạn nắm bắt toàn bộ tiến độ Giai đoạn 2.', 'Cụm từ không thể thiếu trong công việc.'],
      ['walk you through...', '/wɔːk juː θruː/', 'Hướng dẫn chi tiết từng bước cho bạn về...', 'Let me walk you through our Permit-to-Work approval process.', 'Để tôi hướng dẫn từng bước cho bạn về quy trình duyệt Giấy phép làm việc của chúng tôi.', 'Lịch sự và rõ ràng.'],
    ],
  },
  {
    day: 52,
    titleEn: 'Emergency Drill & Incident Response Coordination',
    titleVi: 'Điều phối Diễn tập Ứng phó Sự cố & An toàn Khẩn cấp',
    theme: 'HSE Emergency Preparedness & Command',
    aiPersonaRole: 'Safety Officer Grant - Chỉ huy Diễn tập An toàn',
    userRole: 'Trưởng khu vực báo cáo quân số tại điểm tập kết an toàn (Muster Point)',
    scenarioDescription: 'Đơn vị tổ chức buổi diễn tập báo cháy và sơ tán khẩn cấp định kỳ. Bạn phụ trách kiểm đếm quân số tại điểm tập kết và báo cáo qua bộ đàm bằng tiếng Anh.',
    roleplayGoal: 'Báo cáo rõ ràng, bình tĩnh rằng toàn bộ nhân sự khu vực đã có mặt đầy đủ tại Muster Point.',
    greetingEn: 'Zone B Leader, this is Safety Control. What is the status of your personnel at Muster Point 2?',
    greetingVi: 'Trưởng Khu vực B, đây là Trung tâm Chỉ huy An toàn. Tình hình nhân sự của bạn tại Điểm tập kết số 2 thế nào rồi?',
    suggestedA2: 'All 25 people in Zone B are here at Muster Point 2 safely. No one is missing.',
    suggestedB1: 'Safety Control, this is Zone B. All 25 personnel are accounted for at Muster Point 2, and all equipment has been safely shut down.',
    chunks: [
      ['all personnel are accounted for', '/ɔːl ˌpɜːrsəˈnɛl ɑːr əˈkaʊntɪd fɔːr/', 'Toàn bộ nhân sự đã được kiểm đếm đầy đủ (không thiếu ai)', 'The headcount is complete and all personnel are accounted for.', 'Việc điểm danh đã hoàn tất và toàn bộ nhân sự đều có mặt đầy đủ.', 'Thuật ngữ chuẩn quốc tế trong an toàn & hàng hải/dầu khí.'],
      ['proceed to the muster point', '/prəˈsiːd tə ðə ˈmʌstər pɔɪnt/', 'Di chuyển trật tự tới điểm tập kết an toàn', 'Please remain calm and proceed immediately to the nearest muster point.', 'Xin hãy giữ bình tĩnh và di chuyển ngay tới điểm tập kết gần nhất.', 'Rõ ràng, dứt khoát.'],
      ['follow standard operating procedures (SOP)', '/ˈfɑːloʊ ˈstændərd ˈɑːpəˌreɪtɪŋ prəˈsiːdʒərz/', 'Tuân thủ quy trình vận hành tiêu chuẩn', 'Our crew followed the SOP without any panic.', 'Đội ngũ của chúng tôi đã tuân thủ đúng quy trình chuẩn mà không hề hoảng loạn.', 'Viết tắt là SOP.'],
    ],
  },
  {
    day: 53,
    titleEn: 'Cross-Departmental Resource Sharing',
    titleVi: 'Đàm phán Phối hợp Nhân sự & Thiết bị Liên Phòng ban',
    theme: 'Internal Negotiation & Collaboration',
    aiPersonaRole: 'Jason - Trưởng bộ phận Bảo trì Cơ khí',
    userRole: 'Quản lý Dự án thương lượng mượn 2 kỹ sư kiểm định trong 2 ngày cao điểm',
    scenarioDescription: 'Dự án của bạn bước vào giai đoạn nghiệm thu cao điểm. Bạn sang trao đổi với trưởng bộ phận bên cạnh để mượn tạm 2 kỹ sư có chứng chỉ chuyên môn hỗ trợ.',
    roleplayGoal: 'Đề xuất mượn nhân sự lịch sự và cam kết sẽ hỗ trợ lại bộ phận của họ vào tuần sau.',
    greetingEn: 'Hey! I heard your project is hitting peak testing this week. How can my department help you out?',
    greetingVi: 'Chào bạn! Tôi nghe nói dự án của bạn đang vào đợt cao điểm kiểm thử tuần này. Bộ phận của tôi có thể hỗ trợ gì cho bạn?',
    suggestedA2: 'Can we borrow two of your inspectors for Thursday and Friday? We will help you back next week.',
    suggestedB1: "Thanks, Jason! We're a bit short-handed for Thursday's load test. Could you spare two certified inspectors for 48 hours? We'll gladly return the favor next month!",
    chunks: [
      ['a bit short-handed', '/ə bɪt ʃɔːrt ˈhændɪd/', 'Đang hơi thiếu nhân lực / mỏng người', 'We are a bit short-handed this week due to overlapping shifts.', 'Tuần này chúng tôi đang hơi mỏng người do các ca làm việc trùng nhau.', 'Tự nhiên hơn "lack of people".'],
      ['spare two specialists', '/spɛr tuː ˈspɛʃəlɪsts/', 'San sẻ / nhường tạm 2 chuyên gia hỗ trợ', 'Could you spare a technician for a couple of hours?', 'Bạn có thể san sẻ hỗ trợ tôi một kỹ thuật viên trong vài tiếng được không?', 'Dùng động từ "spare" cực kỳ lịch thiệp.'],
      ['return the favor', '/rɪˈtɜːrn ðə ˈfeɪvər/', 'Đáp lễ / Hỗ trợ lại khi bên kia cần', "I really appreciate your help, and we'll definitely return the favor!", 'Tôi thực sự trân trọng sự giúp đỡ của bạn, và chúng tôi chắc chắn sẽ hỗ trợ lại khi bạn cần!', 'Xây dựng quan hệ đồng nghiệp bền chặt.'],
    ],
  },
];

// ============================================================================
// PHẦN 3: CÁC BÀI HỌC THỰC CHIẾN NÂNG CAO (EXECUTIVE LEADERSHIP & WORKPLACE AGILITY)
// ============================================================================
const EXECUTIVE_ADVANCED_LESSONS: DayLesson[] = [
  {
    day: 53,
    month: 2,
    titleEn: "Managing Scope Creep & Saying Professional No",
    titleVi: "Kiểm soát phình phạm vi dự án & Nghệ thuật từ chối chuyên nghiệp",
    theme: "Project Management & Boundary Setting",
    cefrFocus: "B1",
    scenarioDescription: "Khách hàng yêu cầu bổ sung gấp 3 tính năng mới ngay sát hạn chót release. Bạn cần khéo léo từ chối mà vẫn giữ được quan hệ hợp tác tốt đẹp.",
    aiPersonaRole: "David - Demanding Enterprise Client",
    userRole: "Technical Project Lead managing deliverables",
    roleplayGoal: "Từ chối khéo léo việc thêm tính năng tức thì, đề xuất đưa vào Phase 2 hoặc thảo luận lại ngân sách mà không dùng từ 'No' thô lỗ.",
    initialAiGreeting: {
      en: "We really need these three additional dashboards included in this Friday's release. Can your team squeeze them in?",
      vi: "Bên chúng tôi thực sự cần thêm 3 bảng điều khiển này vào bản phát hành thứ Sáu tới. Đội của bạn có thể cố nhét thêm vào được không?",
      suggestedA2: "No, we cannot do that because we don't have enough time this week.",
      suggestedB1: "I understand these dashboards are valuable, but squeezing them in now would jeopardize our QA testing. How about we slate them for Phase 2?"
    },
    chunks: [
      {
        phrase: "jeopardize the timeline / quality",
        ipa: "/ˈdʒɛpərdaɪz ðə ˈtaɪmlaɪn/",
        meaningVi: "Gây nguy hiểm / đe dọa đến tiến độ hoặc chất lượng",
        example: "Rushing this feature could jeopardize our release timeline.",
        exampleVi: "Vội vàng làm tính năng này có thể gây nguy hiểm cho tiến độ phát hành.",
        collocationTip: "Từ chuẩn văn phong quản lý cấp cao thay cho 'make it bad'."
      },
      {
        phrase: "slate something for Phase 2",
        ipa: "/sleɪt ˈsʌmθɪŋ fɔːr feɪz tuː/",
        meaningVi: "Lên lịch / xếp cái gì vào giai đoạn 2",
        example: "Let's slate these extra requirements for Phase 2.",
        exampleVi: "Hãy lên lịch cho những yêu cầu bổ sung này vào giai đoạn 2 nhé.",
        collocationTip: "'Slate' là ngoại động từ rất hay dùng trong kế hoạch kinh doanh."
      },
      {
        phrase: "trade-off between X and Y",
        ipa: "/treɪd ɔːf bɪˈtwiːn/",
        meaningVi: "Sự đánh đổi giữa X và Y",
        example: "There is always a trade-off between speed and stability.",
        exampleVi: "Luôn có sự đánh đổi giữa tốc độ và tính ổn định.",
        collocationTip: "Cụm danh từ kinh điển khi phân tích lợi hại."
      }
    ],
    shadowingDrills: [
      {
        id: "d53-s1",
        text: "Adding new items now would jeopardize the quality we promised for this sprint.",
        translationVi: "Thêm hạng mục mới lúc này sẽ làm tổn hại đến chất lượng chúng ta đã cam kết cho đợt này.",
        intonationTip: "Nhấn mạnh vào 'jeopardize' và 'quality', hạ giọng dứt khoát cuối câu.",
        speakerRole: "Project Manager"
      },
      {
        id: "d53-s2",
        text: "I propose we slate this for Phase Two so we can give it the attention it deserves.",
        translationVi: "Tôi đề xuất xếp phần này sang Giai đoạn 2 để có thể đầu tư kỹ lưỡng hơn.",
        intonationTip: "Ngữ điệu đề xuất nhã nhặn, lên giọng nhẹ ở 'Phase Two'.",
        speakerRole: "Learner"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Sếp yêu cầu: 'Can we add one more report by tomorrow morning?'",
      challengePromptEn: "Decline tactfully using 'trade-off' or 'jeopardize'.",
      sampleReflexA2: "Sorry, we can't. It will make the system have bugs.",
      sampleReflexB1: "If we rush that in tonight, it would jeopardize system stability. I'd strongly suggest delivering it first thing next week.",
      pedagogicalKey: "Nói lời từ chối bằng cách tập trung vào lợi ích chất lượng của đối phương."
    }
  },

  {
    day: 54,
    month: 2,
    titleEn: "Root Cause Analysis & Incident Post-Mortem",
    titleVi: "Phân tích nguyên nhân gốc rễ & Họp rút kinh nghiệm sự cố",
    theme: "Engineering Accountability & Continuous Improvement",
    cefrFocus: "B1",
    scenarioDescription: "Hệ thống gặp sự cố ngắt quãng tối qua. Bạn chủ trì buổi họp kiểm điểm sự cố với các bên liên quan để tìm nguyên nhân gốc rễ.",
    aiPersonaRole: "Karen - Director of Operations",
    userRole: "Lead Engineer presenting post-mortem findings",
    roleplayGoal: "Giải thích nguyên nhân cốt lõi, thừa nhận thiếu sót và trình bày biện pháp phòng ngừa không tái diễn.",
    initialAiGreeting: {
      en: "Thanks for gathering on short notice. Can you walk us through what triggered the outage yesterday evening?",
      vi: "Cảm ơn mọi người đã có mặt gấp. Bạn có thể giải thích rõ điều gì đã gây ra sự cố mất kết nối tối qua không?",
      suggestedA2: "The server was overloaded because of too many users, but we fixed it.",
      suggestedB1: "Certainly. Our post-mortem revealed that a database deadlock triggered the outage. Here are the corrective actions we've put in place."
    },
    chunks: [
      {
        phrase: "root cause of the issue",
        ipa: "/ruːt kɔːz əv ði ˈɪʃuː/",
        meaningVi: "Nguyên nhân gốc rễ của vấn đề",
        example: "The root cause was traced back to a configuration mismatch.",
        exampleVi: "Nguyên nhân gốc rễ được truy vết là do cấu hình không đồng bộ.",
        collocationTip: "Thuật ngữ cốt lõi trong kỹ thuật và giải quyết sự cố."
      },
      {
        phrase: "put corrective measures in place",
        ipa: "/pʊt kəˈrɛktɪv ˈmɛʒərz ɪn pleɪs/",
        meaningVi: "Thiết lập / triển khai các biện pháp khắc phục phòng ngừa",
        example: "We have already put corrective measures in place to prevent recurrence.",
        exampleVi: "Chúng tôi đã triển khai các biện pháp khắc phục để ngăn chặn tái diễn.",
        collocationTip: "Cụm từ thể hiện tinh thần trách nhiệm và tính chuyên nghiệp cao."
      },
      {
        phrase: "walk someone through something",
        ipa: "/wɔːk ˈsʌmwʌn θruː/",
        meaningVi: "Dẫn dắt / giải thích cặn kẽ cho ai từng bước",
        example: "Let me walk you through the incident timeline.",
        exampleVi: "Để tôi giải thích cặn kẽ dòng thời gian diễn ra sự cố.",
        collocationTip: "Tự nhiên hơn nhiều so với việc chỉ nói 'Let me explain'."
      }
    ],
    shadowingDrills: [
      {
        id: "d54-s1",
        text: "The root cause was identified, and corrective actions have been put in place.",
        translationVi: "Nguyên nhân gốc rễ đã được xác định, và các biện pháp khắc phục đã được triển khai.",
        intonationTip: "Nhấn mạnh 'root cause' và 'corrective actions'.",
        speakerRole: "Lead Engineer"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Khách hàng hỏi: 'How do you ensure this won't happen again next month?'",
      challengePromptEn: "Answer with confidence using 'put corrective measures in place'.",
      sampleReflexA2: "We checked everything and it will not happen again.",
      sampleReflexB1: "We've already put strict automated safeguards in place to ensure this vulnerability is completely eliminated.",
      pedagogicalKey: "Khẳng định cam kết giải pháp thay vì thanh minh lý do."
    }
  },

  {
    day: 55,
    month: 2,
    titleEn: "Delegating Tasks & Setting Clear Expectations",
    titleVi: "Ủy quyền công việc & Thiết lập kỳ vọng rõ ràng",
    theme: "Team Leadership & Accountability",
    cefrFocus: "B1",
    scenarioDescription: "Bạn phân chia hạng mục công việc quan trọng cho một thành viên mới trong nhóm, xác định rõ tiêu chí hoàn thành (DoD) và mốc kiểm tra.",
    aiPersonaRole: "Tom - Junior Team Member",
    userRole: "Team Lead delegating sprint deliverables",
    roleplayGoal: "Giao việc rõ ràng, nêu tiêu chí đánh giá và thỏa thuận mốc đồng bộ (check-in) mà không tạo cảm giác vi mô (micromanaging).",
    initialAiGreeting: {
      en: "Hey! I'm ready to take on the client reporting module. How would you like me to tackle this?",
      vi: "Chào anh/chị! Em đã sẵn sàng nhận module báo cáo khách hàng rồi. Anh/chị muốn em tiếp cận việc này thế nào?",
      suggestedA2: "You need to do the report before Thursday and show it to me.",
      suggestedB1: "Awesome! Let's align on the core deliverables first, and we can set up a quick midpoint check-in on Wednesday."
    },
    chunks: [
      {
        phrase: "align on expectations / deliverables",
        ipa: "/əˈlaɪn ɒn ˌɛkspɛkˈteɪʃənz/",
        meaningVi: "Thống nhất kỳ vọng / sản phẩm bàn giao",
        example: "Before we kick off, let's align on the expected outcomes.",
        exampleVi: "Trước khi bắt tay làm, chúng ta hãy thống nhất về kết quả kỳ vọng.",
        collocationTip: "'Align on' là từ khóa quan trọng của phong cách lãnh đạo hiện đại."
      },
      {
        phrase: "midpoint check-in",
        ipa: "/ˈmɪdpɔɪnt ˈtʃɛkɪn/",
        meaningVi: "Buổi kiểm tra / đồng bộ tiến độ giữa chặng",
        example: "We'll do a brief midpoint check-in to clear any blockers.",
        exampleVi: "Chúng ta sẽ có một buổi đồng bộ giữa chặng để gỡ các vướng mắc.",
        collocationTip: "Tránh cảm giác bị soi xét (micromanage)."
      },
      {
        phrase: "take ownership of...",
        ipa: "/teɪk ˈoʊnərʃɪp əv/",
        meaningVi: "Chủ động chịu trách nhiệm toàn diện cho...",
        example: "I'd love for you to take full ownership of this feature.",
        exampleVi: "Tôi rất mong bạn sẽ chủ động chịu trách nhiệm toàn diện cho tính năng này.",
        collocationTip: "Truyền động lực cho cấp dưới tốt hơn lệnh 'You must do'."
      }
    ],
    shadowingDrills: [
      {
        id: "d55-s1",
        text: "Let's align on the deliverables today and do a quick midpoint check-in on Wednesday.",
        translationVi: "Hôm nay chúng ta hãy thống nhất các hạng mục bàn giao và kiểm tra nhanh giữa chặng vào thứ Tư.",
        intonationTip: "Giọng điệu khích lệ, rõ ràng, dứt khoát.",
        speakerRole: "Team Lead"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Cấp dưới hỏi: 'What if I get stuck with the database schema?'",
      challengePromptEn: "Encourage them and offer a check-in point.",
      sampleReflexA2: "If you are stuck, just call me anytime.",
      sampleReflexB1: "Don't hesitate to ping me right away, or we can troubleshoot it together during our daily standup.",
      pedagogicalKey: "Tạo không gian an toàn tâm lý (psychological safety) khi giao quyền."
    }
  },

  {
    day: 56,
    month: 2,
    titleEn: "Procurement & Vendor Negotiations",
    titleVi: "Mua sắm thiết bị & Đàm phán nhà cung cấp",
    theme: "Commercial Acumen & Cost Optimization",
    cefrFocus: "B1",
    scenarioDescription: "Bạn trao đổi với đối tác phần cứng/dịch vụ đám mây để xin mức chiết khấu tốt hơn cho hợp đồng số lượng lớn hàng năm.",
    aiPersonaRole: "Rachel - Cloud Solutions Sales Director",
    userRole: "Operations Lead negotiating annual renewal terms",
    roleplayGoal: "Thương lượng chiết khấu dựa trên cam kết dài hạn mà vẫn giữ phong thái tôn trọng hai bên cùng có lợi.",
    initialAiGreeting: {
      en: "Good afternoon. Here is our proposed annual contract with standard tier pricing. Does this meet your budgetary goals?",
      vi: "Chào buổi chiều. Đây là hợp đồng thường niên đề xuất theo biểu giá tiêu chuẩn. Mức này có khớp với mục tiêu ngân sách của bạn không?",
      suggestedA2: "It is too expensive. Can you give us a discount?",
      suggestedB1: "Thank you for the quote, Rachel. Given that we are committing to a multi-year term, is there room for maneuver on the tier pricing?"
    },
    chunks: [
      {
        phrase: "room for maneuver / flexibility",
        ipa: "/ruːm fɔːr məˈnuːvər/",
        meaningVi: "Dư địa để thương lượng / linh hoạt điều chỉnh",
        example: "Is there any room for maneuver on the licensing fees?",
        exampleVi: "Có còn dư địa nào để thương lượng về phí bản quyền không?",
        collocationTip: "Văn phong đàm phán cực kỳ lịch thiệp và thông minh."
      },
      {
        phrase: "lock in a competitive rate",
        ipa: "/lɒk ɪn ə kəmˈpɛtɪtɪv reɪt/",
        meaningVi: "Chốt được mức giá cạnh tranh / ưu đãi",
        example: "We are hoping to lock in a more competitive rate for 24 months.",
        exampleVi: "Chúng tôi hy vọng có thể chốt được mức giá cạnh tranh hơn cho gói 24 tháng.",
        collocationTip: "'Lock in' là động từ chuyên ngành tài chính - thương mại."
      },
      {
        phrase: "sweeten the deal",
        ipa: "/ˈswiːtn ðə diːl/",
        meaningVi: "Tăng thêm quyền lợi để hợp đồng hấp dẫn hơn",
        example: "Could you sweeten the deal by including premium 24/7 support?",
        exampleVi: "Bên bạn có thể tăng thêm quyền lợi bằng việc kèm gói hỗ trợ cao cấp 24/7 được không?",
        collocationTip: "Thành ngữ thương mại phổ biến khi đàm phán giá trị gia tăng."
      }
    ],
    shadowingDrills: [
      {
        id: "d56-s1",
        text: "If we commit to an upfront annual payment, is there room for maneuver on the total cost?",
        translationVi: "Nếu chúng tôi cam kết thanh toán trước cả năm, liệu có còn dư địa thương lượng về tổng chi phí không?",
        intonationTip: "Lên giọng lịch sự ở 'total cost?'.",
        speakerRole: "Negotiator"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Nhà cung cấp nói: 'Our prices are completely fixed.'",
      challengePromptEn: "Ask for added value instead using 'sweeten the deal' or 'value-add'.",
      sampleReflexA2: "Okay, then can you give us free training?",
      sampleReflexB1: "Understood on the fixed pricing. Could you sweeten the deal by bundling in free onboarding and extended SLA support?",
      pedagogicalKey: "Khi đối tác cứng về giá, hãy linh hoạt chuyển hướng sang đàm phán giá trị gia tăng."
    }
  },

  {
    day: 57,
    month: 2,
    titleEn: "Cross-Functional Collaboration & Overcoming Silos",
    titleVi: "Phối hợp liên phòng ban & Phá vỡ rào cản cục bộ",
    theme: "Organizational Alignment & Synergy",
    cefrFocus: "B1",
    scenarioDescription: "Bộ phận Kinh doanh và bộ phận Kỹ thuật đang có bất đồng về thứ tự ưu tiên tính năng. Bạn điều phối buổi họp để tìm tiếng nói chung.",
    aiPersonaRole: "Liam - Head of Sales",
    userRole: "Product Strategist bridging engineering and commercial needs",
    roleplayGoal: "Lắng nghe cả hai góc nhìn, làm rõ giá trị chung cho toàn công ty và tìm ra phương án thỏa hiệp tối ưu.",
    initialAiGreeting: {
      en: "Sales is losing deals because tech is delaying our custom requests! We need our feature shipped yesterday!",
      vi: "Bên kinh doanh đang mất hợp đồng vì kỹ thuật cứ trì hoãn yêu cầu riêng của chúng tôi! Chúng tôi cần tính năng đó ngay hôm qua rồi!",
      suggestedA2: "Tech team is very busy too, so please wait your turn.",
      suggestedB1: "I completely hear your frustration regarding client pressure, Liam. Let's look at the customer impact together so we can prioritize what drives immediate revenue without breaking our core architecture."
    },
    chunks: [
      {
        phrase: "break down departmental silos",
        ipa: "/breɪk daʊn ˌdɪpɑːrtˈmɛntl ˈsaɪloʊz/",
        meaningVi: "Xóa bỏ rào cản cục bộ giữa các phòng ban",
        example: "We need to break down silos to accelerate our delivery speed.",
        exampleVi: "Chúng ta cần xóa bỏ rào cản phòng ban để đẩy nhanh tốc độ bàn giao.",
        collocationTip: "'Silo' nghĩa bóng là tư duy co cụm, khép kín trong công ty."
      },
      {
        phrase: "a win-win compromise",
        ipa: "/ə wɪn wɪn ˈkɒmprəmaɪz/",
        meaningVi: "Một thỏa hiệp đôi bên cùng có lợi",
        example: "Let's find a win-win compromise that respects both timelines.",
        exampleVi: "Chúng ta hãy tìm một giải pháp thỏa hiệp đôi bên cùng có lợi và tôn trọng tiến độ cả hai bên.",
        collocationTip: "Từ vựng đắt giá trong kỹ năng hòa giải mâu thuẫn."
      },
      {
        phrase: "from a broader business perspective",
        ipa: "/frəm ə ˈbrɔːdər ˈbɪznəs pərˈspɛktɪv/",
        meaningVi: "Nhìn từ góc độ kinh doanh tổng thể",
        example: "From a broader business perspective, customer retention is paramount.",
        exampleVi: "Nhìn từ góc độ kinh doanh tổng thể, giữ chân khách hàng là điều tối quan trọng.",
        collocationTip: "Giúp nâng tầm cuộc trò chuyện lên cấp độ chiến lược."
      }
    ],
    shadowingDrills: [
      {
        id: "d57-s1",
        text: "From a broader business perspective, finding common ground is essential for our growth.",
        translationVi: "Nhìn từ góc độ kinh doanh tổng thể, tìm được tiếng nói chung là điều cốt yếu cho sự phát triển của chúng ta.",
        intonationTip: "Trầm ấm, chững chạc và thuyết phục.",
        speakerRole: "Facilitator"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Đồng nghiệp bức xúc: 'Marketing never understands how hard engineering works!'",
      challengePromptEn: "Defuse tension using 'broader perspective' or 'common ground'.",
      sampleReflexA2: "Yes, Marketing is very annoying sometimes.",
      sampleReflexB1: "It can definitely be frustrating, but looking at it from a broader perspective, aligning closely with them is the only way our product gets into users' hands.",
      pedagogicalKey: "Thể hiện tư duy quản lý điềm tĩnh, không hùa theo bức xúc cục bộ."
    }
  },

  {
    day: 58,
    month: 2,
    titleEn: "Pitching an Efficiency Initiative to Leadership",
    titleVi: "Thuyết trình sáng kiến tối ưu hiệu suất với ban lãnh đạo",
    theme: "Executive Presentation & Persuasion",
    cefrFocus: "B1",
    scenarioDescription: "Bạn trình bày đề xuất tự động hóa quy trình nội bộ trước Giám đốc Vận hành để xin phê duyệt ngân sách thử nghiệm.",
    aiPersonaRole: "Elena - Chief Operating Officer (COO)",
    userRole: "Senior Specialist proposing process automation",
    roleplayGoal: "Trình bày bài thuyết trình 60 giây súc tích: Vấn đề (Pain point) → Giải pháp → ROI ước tính.",
    initialAiGreeting: {
      en: "I have about five minutes before my board meeting. What is this efficiency proposal you mentioned?",
      vi: "Tôi có khoảng năm phút trước cuộc họp hội đồng quản trị. Đề xuất tối ưu hiệu suất mà bạn nhắc đến là gì thế?",
      suggestedA2: "Our team spends too much time on manual files. An automated tool will save time.",
      suggestedB1: "Thanks for your time, Elena. Currently, our engineers lose fifteen hours weekly on manual data syncing. By adopting this tool, we will cut that by eighty percent, yielding a clear ROI within sixty days."
    },
    chunks: [
      {
        phrase: "yield a tangible ROI",
        ipa: "/jiːld ə ˈtændʒəbl ˌɑːr oʊ ˈaɪ/",
        meaningVi: "Mang lại tỷ suất hoàn vốn rõ ràng / đo lường được",
        example: "This automation initiative will yield a tangible ROI within the first quarter.",
        exampleVi: "Sáng kiến tự động hóa này sẽ mang lại lợi tức đầu tư rõ rệt ngay trong quý đầu tiên.",
        collocationTip: "'Tangible' (hữu hình, thực tế) là tính từ chuyên môn cao cấp."
      },
      {
        phrase: "free up valuable bandwidth",
        ipa: "/friː ʌp ˈvæljuəbl ˈbændwɪdθ/",
        meaningVi: "Giải phóng thời gian và nguồn lực quý giá",
        example: "Automating this will free up valuable bandwidth for core product innovation.",
        exampleVi: "Tự động hóa việc này sẽ giải phóng nguồn lực quý giá để tập trung cải tiến sản phẩm cốt lõi.",
        collocationTip: "'Bandwidth' trong môi trường văn phòng nghĩa là thời gian/sức lực khả dụng."
      },
      {
        phrase: "pilot the solution",
        ipa: "/ˈpaɪlət ðə səˈluːʃn/",
        meaningVi: "Chạy thử nghiệm giải pháp ở quy mô nhỏ",
        example: "We propose piloting the solution with one team before full rollout.",
        exampleVi: "Chúng tôi đề xuất thử nghiệm giải pháp với một đội trước khi triển khai toàn diện.",
        collocationTip: "Giúp giảm rủi ro khi xin phê duyệt từ cấp trên."
      }
    ],
    shadowingDrills: [
      {
        id: "d58-s1",
        text: "This pilot will free up valuable bandwidth and demonstrate tangible ROI within sixty days.",
        translationVi: "Dự án thử nghiệm này sẽ giải phóng nguồn lực quý giá và chứng minh tỷ suất sinh lời thực tế trong vòng 60 ngày.",
        intonationTip: "Nhấn mạnh các số liệu 'sixty days' và từ 'tangible ROI'.",
        speakerRole: "Presenter"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Lãnh đạo hỏi: 'What happens if the pilot fails?'",
      challengePromptEn: "Address risk using 'calculated risk' or 'minimal exposure'.",
      sampleReflexA2: "If it fails, we will stop and we don't lose much money.",
      sampleReflexB1: "The pilot is intentionally structured with minimal risk, meaning we can evaluate real data with virtually zero disruption to daily operations.",
      pedagogicalKey: "Trấn an lãnh đạo bằng việc nhấn mạnh tính toán rủi ro có kiểm soát."
    }
  },

  {
    day: 59,
    month: 2,
    titleEn: "Career Progression & Performance Review Dialogue",
    titleVi: "Trao đổi lộ trình thăng tiến & Đánh giá năng lực định kỳ",
    theme: "Professional Growth & Self-Advocacy",
    cefrFocus: "B1",
    scenarioDescription: "Trong buổi đánh giá định kỳ 1-on-1 với quản lý trực tiếp, bạn chủ động chia sẻ về các thành quả đạt được và thảo luận về nấc thang chức danh tiếp theo.",
    aiPersonaRole: "Mark - Senior Director & People Manager",
    userRole: "Consistent high performer discussing promotion criteria",
    roleplayGoal: "Trình bày thành tích định lượng, bày tỏ nguyện vọng thăng tiến tự tin mà khiêm tốn.",
    initialAiGreeting: {
      en: "You've had a solid quarter, especially with the client migration. Looking ahead, where do you see your next growth milestone?",
      vi: "Bạn đã có một quý làm việc rất vững vàng, đặc biệt là dự án chuyển giao khách hàng. Hướng tới tương lai, bạn nhìn nhận cột mốc phát triển tiếp theo của mình ở đâu?",
      suggestedA2: "I want to be promoted to Senior Manager next year because I work very hard.",
      suggestedB1: "Thank you, Mark. Over the past year, I've taken on broader mentoring and technical ownership. I'd love to discuss what specific competencies I need to demonstrate to transition into a Senior Lead role."
    },
    chunks: [
      {
        phrase: "take on broader responsibilities",
        ipa: "/teɪk ɒn ˈbrɔːdər rɪˌspɒnsəˈbɪlətiz/",
        meaningVi: "Đảm nhận những trọng trách rộng lớn hơn",
        example: "I am eager to take on broader responsibilities across regional teams.",
        exampleVi: "Tôi rất mong muốn được đảm nhận những trọng trách rộng hơn ở quy mô khu vực.",
        collocationTip: "Thể hiện sự sẵn sàng gánh vác thay vì đòi hỏi quyền lợi trước."
      },
      {
        phrase: "tangible contributions to the bottom line",
        ipa: "/ˈtændʒəbl ˌkɒntrɪˈbjuːʃənz tuː ðə ˈbɒtəm laɪn/",
        meaningVi: "Những đóng góp cụ thể vào kết quả kinh doanh cuối cùng",
        example: "My initiatives made tangible contributions to the bottom line this year.",
        exampleVi: "Các sáng kiến của tôi đã mang lại đóng góp cụ thể vào kết quả tài chính năm nay.",
        collocationTip: "'Bottom line' nghĩa là lợi nhuận ròng hoặc mục tiêu sống còn."
      },
      {
        phrase: "concrete milestones for advancement",
        ipa: "/ˈkɒŋkriːt ˈmaɪlstoʊnz fɔːr ədˈvɑːnsmənt/",
        meaningVi: "Những cột mốc cụ thể để thăng tiến",
        example: "Could we outline concrete milestones for my advancement over the next six months?",
        exampleVi: "Chúng ta có thể phác thảo các cột mốc cụ thể cho sự thăng tiến của tôi trong 6 tháng tới không?",
        collocationTip: "Chủ động đề nghị xây dựng tiêu chí đo lường rõ ràng."
      }
    ],
    shadowingDrills: [
      {
        id: "d59-s1",
        text: "I'd love to align on concrete milestones required to take the next step in my career here.",
        translationVi: "Tôi rất muốn thống nhất các cột mốc cụ thể cần thiết để tiến bước tiếp theo trong sự nghiệp tại đây.",
        intonationTip: "Chân thành, tự tin, phát âm rõ từng âm tiết.",
        speakerRole: "Professional"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Sếp hỏi: 'What do you think is your biggest area for improvement right now?'",
      challengePromptEn: "Answer constructively using 'sharpen my skills' or 'strategic visibility'.",
      sampleReflexA2: "My English speaking is not good, so I need to learn more.",
      sampleReflexB1: "While my technical execution is strong, I'm actively working to sharpen my strategic communication to better represent our team at executive presentations.",
      pedagogicalKey: "Biến điểm yếu thành kế hoạch hành động cụ thể và có tính chiến lược."
    }
  },

  {
    day: 60,
    month: 2,
    titleEn: "Month 2 Capstone: Navigating High-Stakes Stakeholder Alignment",
    titleVi: "Cột mốc Tháng 2: Thống nhất chiến lược đa bên trong tình huống áp lực cao",
    theme: "Strategic Consensus & Milestone Review",
    cefrFocus: "B1",
    scenarioDescription: "Buổi họp hội đồng cuối tháng với sự tham gia của Giám đốc Kỹ thuật, Giám đốc Kinh doanh và Khách hàng đối tác để chốt kế hoạch quý tới.",
    aiPersonaRole: "Arthur - Managing Director presiding over quarterly steering committee",
    userRole: "Key Project Lead synthesizing stakeholder needs into consensus",
    roleplayGoal: "Tổng kết thành quả 60 ngày, xử lý các câu hỏi hóc búa từ các bên và chốt kế hoạch hành động với sự đồng thuận cao.",
    initialAiGreeting: {
      en: "Welcome everyone to our Q3 Steering Committee. The agenda is tight and opinions are divided. How does our current readiness look?",
      vi: "Chào mừng mọi người đến với phiên họp Ban chỉ đạo Q3. Lịch trình rất gấp và các ý kiến đang phân hóa. Mức độ sẵn sàng hiện tại của chúng ta ra sao?",
      suggestedA2: "We are ready, but we need more budget and more people.",
      suggestedB1: "Good morning Arthur and team. Over the last two months, we've stabilized our core metrics by thirty percent. Today, we're presenting a balanced roadmap that safeguards quality while meeting our commercial milestones."
    },
    chunks: [
      {
        phrase: "drive strategic consensus",
        ipa: "/draɪv strəˈtiːdʒɪk kənˈsɛnsəs/",
        meaningVi: "Thúc đẩy sự đồng thuận chiến lược",
        example: "Our primary objective today is to drive strategic consensus across teams.",
        exampleVi: "Mục tiêu trọng tâm hôm nay là thúc đẩy sự đồng thuận chiến lược giữa các đội.",
        collocationTip: "Văn phong cấp quản lý điều hành doanh nghiệp."
      },
      {
        phrase: "strike a balance between X and Y",
        ipa: "/straɪk ə ˈbæləns bɪˈtwiːn/",
        meaningVi: "Tìm điểm cân bằng hài hòa giữa X và Y",
        example: "We must strike a balance between aggressive timelines and system stability.",
        exampleVi: "Chúng ta phải tìm được điểm cân bằng giữa tiến độ gấp và độ ổn định của hệ thống.",
        collocationTip: "Cụm diễn đạt mượt mà và thuyết phục hơn nhiều so với 'balance X and Y'."
      },
      {
        phrase: "move the needle on our key metrics",
        ipa: "/muːv ðə ˈniːdl ɒn maɪ kiː ˈmɛtrɪks/",
        meaningVi: "Tạo ra thay đổi thực sự rõ rệt đối với các chỉ số then chốt",
        example: "This consolidated initiative will truly move the needle on customer satisfaction.",
        exampleVi: "Sáng kiến đồng bộ này sẽ thực sự tạo ra bước chuyển biến lớn cho sự hài lòng của khách hàng.",
        collocationTip: "Thành ngữ kinh doanh thời thượng được các CEO quốc tế ưa chuộng."
      }
    ],
    shadowingDrills: [
      {
        id: "d60-s1",
        text: "By striking a balance between innovation and stability, we can genuinely move the needle for the entire company.",
        translationVi: "Bằng việc cân bằng giữa đổi mới và ổn định, chúng ta có thể tạo ra bước chuyển biến thực sự cho toàn công ty.",
        intonationTip: "Khí thế tự tin, trầm ấm, truyền cảm hứng.",
        speakerRole: "Executive Lead"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Giám đốc hỏi: 'What is the single most important lesson from your project over the last 60 days?'",
      challengePromptEn: "Summarize using 'proactive communication' or 'strategic consensus'.",
      sampleReflexA2: "We learned that everyone needs to talk to each other every day.",
      sampleReflexB1: "The biggest takeaway is that proactive alignment and transparent communication eliminate ninety percent of potential roadblocks before they even materialize.",
      pedagogicalKey: "Khẳng định bản lĩnh phản xạ B1 qua câu trả lời đúc kết có chiều sâu."
    }
  },

  // ================= MONTH 3: DAYS 61 - 90 (Giao tiếp Phức tạp, Đàm phán Đỉnh cao & B1+) =================
  {
    day: 61,
    month: 3,
    titleEn: "Spontaneous Storytelling & Vivid Narrative Arc",
    titleVi: "Kể chuyện cuốn hút & Tạo cao trào tự nhiên",
    theme: "Masterful Storytelling & Personal Anecdotes",
    cefrFocus: "B1 → B1+",
    scenarioDescription: "Bạn đang ngồi ăn tối thân mật với một đối tác quốc tế. Đối phương tò mò hỏi về chuyến công tác hoặc sự cố nhớ đời gần đây nhất của bạn.",
    aiPersonaRole: "Chloe - Engaged dinner companion",
    userRole: "Engaging storyteller sharing an unexpected travel adventure",
    roleplayGoal: "Dùng các thì quá khứ linh hoạt (Past Continuous, Past Perfect) kết hợp từ nối tạo kịch tính ('out of nowhere', 'to make matters worse').",
    initialAiGreeting: {
      en: "Someone told me you had the craziest adventure when you backpacked through Southeast Asia! What actually happened?",
      vi: "Có người nói với tôi bạn từng có một chuyến phiêu lưu nhớ đời khi đi phượt Đông Nam Á! Chuyện thực sự thế nào vậy?",
      suggestedA2: "Yes, it was crazy! I lost my passport on the bus, but I found it later.",
      suggestedB1: "Oh man, where do I even begin? So, picture this: it was midnight, pouring rain, and out of nowhere, our bus broke down in the middle of nowhere!"
    },
    chunks: [
      {
        phrase: "where do I even begin?",
        ipa: "/wɛər duː aɪ ˈiːvən bɪˈɡɪn/",
        meaningVi: "Biết bắt đầu từ đâu bây giờ? (Mở đầu cuốn hút)",
        example: "Where do I even begin? It was a wild ride from start to finish!",
        exampleVi: "Biết bắt đầu từ đâu đây? Đúng là một trải nghiệm đầy sóng gió từ đầu tới cuối!",
        collocationTip: "Cách mở đầu tự nhiên thu hút ngay sự chú ý của người nghe."
      },
      {
        phrase: "out of nowhere",
        ipa: "/aʊt əv ˈnoʊwɛər/",
        meaningVi: "Bỗng nhiên / Bất thình lình xuất hiện",
        example: "Out of nowhere, a massive thunderstorm hit the highway.",
        exampleVi: "Bất thình lình, một cơn giông bão khủng khiếp ập xuống đường cao tốc.",
        collocationTip: "Tạo bước ngoặt kịch tính cho câu chuyện."
      },
      {
        phrase: "long story short",
        ipa: "/lɒŋ ˈstɔːri ʃɔːrt/",
        meaningVi: "Tóm lại là / Nói ngắn gọn thì",
        example: "Long story short, we made it to the airport just five minutes before gate closure.",
        exampleVi: "Tóm lại là, chúng tôi đến được sân bay đúng 5 phút trước giờ đóng cửa khởi hành.",
        collocationTip: "Cách chốt lại câu chuyện duyên dáng và không bị lan man."
      }
    ],
    shadowingDrills: [
      {
        id: "d61-s1",
        text: "Long story short, what started as a complete disaster turned into the best memory of the trip!",
        translationVi: "Tóm lại là, điều tưởng như thảm họa lúc đầu lại hóa thành kỷ niệm đẹp nhất của cả chuyến đi!",
        intonationTip: "Cao trào vui vẻ ở 'best memory', hạ giọng nhẹ ở cuối câu.",
        speakerRole: "Storyteller"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Bạn bè hỏi: 'How did that crazy interview end up?'",
      challengePromptEn: "Wrap it up dynamically using 'Long story short'.",
      sampleReflexA2: "Long story short, they gave me the job!",
      sampleReflexB1: "Long story short, despite all the unexpected technical glitches, they ended up making me an offer right on the spot!",
      pedagogicalKey: "Phản xạ kết thúc câu chuyện nhanh gọn, tích cực và truyền cảm hứng."
    }
  },

  {
    day: 62,
    month: 3,
    titleEn: "Discussing Global Tech Trends & Ethical AI",
    titleVi: "Thảo luận xu hướng công nghệ toàn cầu & Đạo đức AI",
    theme: "Intellectual Discourse & Critical Perspectives",
    cefrFocus: "B1 → B1+",
    scenarioDescription: "Trong buổi giao lưu công nghệ sau hội thảo, bạn và một chuyên gia nước ngoài bàn luận về tác động của Trí tuệ Nhân tạo đối với thị trường việc làm.",
    aiPersonaRole: "Dr. Aris - AI Ethics Researcher from Cambridge",
    userRole: "Forward-thinking professional offering a balanced view",
    roleplayGoal: "Trình bày quan điểm đa chiều về AI: Tự động hóa công việc thường nhật vs Tạo ra giá trị sáng tạo mới.",
    initialAiGreeting: {
      en: "Do you worry that generative AI will make a large portion of knowledge workers obsolete in the coming years?",
      vi: "Bạn có lo ngại rằng AI tạo sinh sẽ khiến phần lớn lao động tri thức trở nên thừa thãi trong những năm tới không?",
      suggestedA2: "Yes, I think AI will replace many people because it is faster.",
      suggestedB1: "I think there's valid concern about disruption, but rather than replacing humans outright, AI is much more likely to augment those who learn to leverage it effectively."
    },
    chunks: [
      {
        phrase: "double-edged sword",
        ipa: "/ˌdʌbl ɛdʒd sɔːrd/",
        meaningVi: "Con dao hai lưỡi (Vừa có lợi vừa có hại)",
        example: "Rapid automation is definitely a double-edged sword for developing economies.",
        exampleVi: "Tự động hóa nhanh chóng chắc chắn là con dao hai lưỡi đối với các nền kinh tế đang phát triển.",
        collocationTip: "Ẩn dụ kinh điển khi phân tích công nghệ mới."
      },
      {
        phrase: "augment human capability",
        ipa: "/ɔːɡˈmɛnt ˈhjuːmən ˌkeɪpəˈbɪləti/",
        meaningVi: "Gia tăng / khuếch đại năng lực con người",
        example: "AI should be engineered to augment human capability rather than displace it.",
        exampleVi: "AI nên được thiết kế để khuếch đại năng lực con người thay vì đào thải họ.",
        collocationTip: "Thuật ngữ học thuật chuẩn B1+ thay cho 'help people'."
      },
      {
        phrase: "future-proof one's career",
        ipa: "/ˈfjuːtʃər pruːf wʌnz kəˈrɪər/",
        meaningVi: "Bảo đảm sự nghiệp bền vững trước biến động tương lai",
        example: "Continuous upskilling is the best way to future-proof your career.",
        exampleVi: "Không ngừng nâng cao kỹ năng là cách tốt nhất để bảo đảm tương lai sự nghiệp của bạn.",
        collocationTip: "Cụm từ rất được các chuyên gia 30-40 tuổi quan tâm."
      }
    ],
    shadowingDrills: [
      {
        id: "d62-s1",
        text: "Technology is a double-edged sword, but continuous learning is how we future-proof our teams.",
        translationVi: "Công nghệ là con dao hai lưỡi, nhưng không ngừng học hỏi chính là cách chúng ta bảo đảm tương lai cho đội ngũ.",
        intonationTip: "Nhịp điệu sâu lắng, dứt khoát và trí tuệ.",
        speakerRole: "Thought Leader"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Ai đó hỏi: 'Is AI going to take over your job soon?'",
      challengePromptEn: "Answer with nuanced wit using 'augment' or 'double-edged sword'.",
      sampleReflexA2: "No, AI cannot do everything I do.",
      sampleReflexB1: "I view AI not as a competitor, but as an amplifier that automates the repetitive tasks so I can focus on strategic problem-solving.",
      pedagogicalKey: "Khẳng định vị thế chuyên gia thông qua cách lựa chọn từ ngữ tầm chiến lược."
    }
  },

  {
    day: 75,
    month: 3,
    titleEn: "Constructive Debate & Tactful Disagreement",
    titleVi: "Tranh biện xây dựng & Bất đồng quan điểm có chiều sâu",
    theme: "Critical Thinking & Nuanced Persuasion",
    cefrFocus: "B1 → B1+",
    scenarioDescription: "Trong buổi thảo luận chiến lược, đối tác khăng khăng đòi quay lại làm việc 100% tại văn phòng. Bạn phản biện bảo vệ mô hình kết hợp linh hoạt (Hybrid).",
    aiPersonaRole: "Arthur - Traditional business strategist",
    userRole: "Advocate for modern flexible work culture presenting balanced arguments",
    roleplayGoal: "Bác bỏ lập luận mà không gây căng thẳng, dùng cấu trúc 'I see where you're coming from, but...', 'Look at it from another angle'.",
    initialAiGreeting: {
      en: "I genuinely believe everyone needs to be in the office five days a week for real collaboration. Remote work just dilutes company culture.",
      vi: "Tôi thực sự tin rằng mọi người cần có mặt ở văn phòng đủ 5 ngày một tuần để có sự cộng tác thực chất. Làm việc từ xa chỉ làm loãng văn hóa công ty.",
      suggestedA2: "I disagree with you. Working from home saves a lot of time and money.",
      suggestedB1: "I definitely see your point regarding spontaneous teamwork, but on the flip side, hybrid work drastically boosts focused productivity while cutting attrition."
    },
    chunks: [
      {
        phrase: "I see where you're coming from, but...",
        ipa: "/aɪ siː wɛər jʊər ˈkʌmɪŋ frɒm bʌt/",
        meaningVi: "Tôi hiểu góc nhìn của bạn, tuy nhiên...",
        example: "I see where you're coming from, but we should also examine the attrition data.",
        exampleVi: "Tôi hiểu góc nhìn của bạn, nhưng chúng ta cũng nên xem xét số liệu tỷ lệ nghỉ việc.",
        collocationTip: "Mẫu câu vàng để mở đầu lời phản biện mà không làm phật lòng đối phương."
      },
      {
        phrase: "on the flip side",
        ipa: "/ɒn ðə flɪp saɪd/",
        meaningVi: "Ở chiều ngược lại / Mặt khác",
        example: "On the flip side, geographical flexibility allows us to recruit top-tier talent.",
        exampleVi: "Ở chiều ngược lại, sự linh hoạt địa lý cho phép chúng ta tuyển dụng nhân tài hàng đầu.",
        collocationTip: "Tự nhiên hơn nhiều so với việc lặp đi lặp lại 'On the other hand'."
      },
      {
        phrase: "find common ground",
        ipa: "/faɪnd ˈkɒmən ɡraʊnd/",
        meaningVi: "Tìm thấy tiếng nói chung / điểm tương đồng",
        example: "I am confident we can find common ground that satisfies both leadership and staff.",
        exampleVi: "Tôi tin chắc chúng ta có thể tìm được tiếng nói chung làm hài lòng cả ban lãnh đạo lẫn nhân viên.",
        collocationTip: "Mục đích tối hậu của mọi cuộc tranh biện xây dựng."
      }
    ],
    shadowingDrills: [
      {
        id: "d75-s1",
        text: "I respect that perspective, but if we look at the data, the hybrid model delivers the best of both worlds.",
        translationVi: "Tôi tôn trọng góc nhìn đó, nhưng nếu nhìn vào số liệu, mô hình kết hợp mang lại lợi ích tốt nhất từ cả hai phía.",
        intonationTip: "Điềm đạm, thuyết phục, ngắt nhịp rõ ràng sau 'data'.",
        speakerRole: "Debater"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Một đồng nghiệp bảo thủ nói: 'Email is dead, everyone should just use chat apps!'",
      challengePromptEn: "Disagree politely using 'I see where you're coming from, but...'",
      sampleReflexA2: "I don't think so. Email is still important.",
      sampleReflexB1: "I see where you're coming from for quick updates, but for formal audit trails and complex contracts, email remains completely indispensable.",
      pedagogicalKey: "Bày tỏ bất đồng trên nền tảng logic và dẫn chứng sắc bén."
    }
  },

  {
    day: 80,
    month: 3,
    titleEn: "Crisis Communication & Handling Tough Media Questions",
    titleVi: "Giao tiếp trong khủng hoảng & Đối đáp câu hỏi hóc búa",
    theme: "High-Pressure Composure & Media Relations",
    cefrFocus: "B1 → B1+",
    scenarioDescription: "Trong buổi họp báo sau sự cố kỹ thuật, một phóng viên đặt câu hỏi dồn dập về trách nhiệm và bồi thường thiệt hại cho khách hàng.",
    aiPersonaRole: "Victoria - Persistent investigative journalist",
    userRole: "Company Spokesperson maintaining calm authority",
    roleplayGoal: "Bình tĩnh đón nhận câu hỏi, không đôi co gay gắt, điều hướng câu trả lời về cam kết minh bạch và giải pháp an toàn.",
    initialAiGreeting: {
      en: "Isn't it true that your company ignored safety warnings for months just to cut operational costs?",
      vi: "Có phải công ty của quý vị đã phớt lờ các cảnh báo an toàn suốt nhiều tháng qua chỉ để cắt giảm chi phí vận hành không?",
      suggestedA2: "No, that is not true! We care about safety very much.",
      suggestedB1: "I categorically reject that premise. Safety has always been our non-negotiable priority, and we are currently working alongside independent auditors to make every finding public."
    },
    chunks: [
      {
        phrase: "non-negotiable priority",
        ipa: "/nɒn nɪˈɡoʊʃiəbl praɪˈɒrəti/",
        meaningVi: "Ưu tiên hàng đầu không thể thỏa hiệp hay nhân nhượng",
        example: "The safety of our personnel is a non-negotiable priority.",
        exampleVi: "Sự an toàn của nhân sự là ưu tiên tuyệt đối không thể nhân nhượng.",
        collocationTip: "Cụm từ thể hiện lập trường vững chắc và đạo đức nghề nghiệp."
      },
      {
        phrase: "set the record straight",
        ipa: "/sɛt ðə ˈrɛkɔːrd streɪt/",
        meaningVi: "Làm sáng tỏ sự thật / đính chính thông tin sai lệch",
        example: "I appreciate the opportunity to set the record straight on this matter.",
        exampleVi: "Tôi rất trân trọng cơ hội được làm sáng tỏ sự thật về vấn đề này.",
        collocationTip: "Văn phong ngoại giao chuẩn xác khi đối thoại trước công chúng."
      },
      {
        phrase: "leave no stone unturned",
        ipa: "/liːv noʊ stoʊn ʌnˈtɜːrnd/",
        meaningVi: "Làm mọi cách / không bỏ sót bất kỳ manh mối nào",
        example: "We will leave no stone unturned until the investigation is complete.",
        exampleVi: "Chúng tôi sẽ điều tra kỹ lưỡng đến cùng cho tới khi có kết luận toàn diện.",
        collocationTip: "Thành ngữ thể hiện quyết tâm minh bạch tối đa."
      }
    ],
    shadowingDrills: [
      {
        id: "d80-s1",
        text: "Safety remains our non-negotiable priority, and we will leave no stone unturned to get to the truth.",
        translationVi: "An toàn luôn là ưu tiên bất biến của chúng tôi, và chúng tôi sẽ làm sáng tỏ mọi ngóc ngách để tìm ra chân tướng sự thật.",
        intonationTip: "Chững chạc, trang trọng, âm vực trầm ổn định.",
        speakerRole: "Spokesperson"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Một đối tác hỏi gắt gao: 'Is your system really secure or are you hiding something?'",
      challengePromptEn: "Respond with poise using 'transparent' or 'non-negotiable priority'.",
      sampleReflexA2: "Our system is very good, we don't hide anything.",
      sampleReflexB1: "Security is our non-negotiable priority. We welcome full external audits and maintain a completely transparent policy with all our partners.",
      pedagogicalKey: "Kiểm soát cảm xúc, dùng từ vựng đĩnh đạc để chuyển nguy thành cơ."
    }
  },

  {
    day: 85,
    month: 3,
    titleEn: "Executive Elevator Pitch: Your Vision in 60 Seconds",
    titleVi: "Bản giới thiệu thang máy 60 giây: Khắc họa tầm nhìn",
    theme: "Executive Presence & Concise Vision",
    cefrFocus: "B1 → B1+",
    scenarioDescription: "Bạn tình cờ đi chung thang máy với Tổng Giám đốc Tập đoàn đa quốc gia. Bạn có đúng 60 giây để giới thiệu bản thân và sáng kiến tâm huyết của mình.",
    aiPersonaRole: "Gordon - Global Group CEO",
    userRole: "Ambitious Business Leader making an unforgettable elevator pitch",
    roleplayGoal: "Truyền tải câu chuyện truyền cảm hứng, nêu bật giá trị khác biệt và xin một cuộc hẹn 15 phút tại văn phòng.",
    initialAiGreeting: {
      en: "Morning! I don't see you on the 40th floor very often. What project are you currently driving?",
      vi: "Chào buổi sáng! Tôi không hay thấy bạn ở tầng 40 này lắm. Hiện tại bạn đang trực tiếp dẫn dắt dự án nào thế?",
      suggestedA2: "Good morning! I am leading the safety digital project. It is doing very well.",
      suggestedB1: "Morning Gordon! I'm leading the offshore safety compliance overhaul. We've modernized legacy protocols across three rigs, cutting incident risks by forty percent. I'd love to share our five-minute executive summary sometime."
    },
    chunks: [
      {
        phrase: "drive an overhaul of...",
        ipa: "/draɪv ən ˈoʊvərhɔːl əv/",
        meaningVi: "Dẫn dắt cuộc đại tu / cải tổ toàn diện cho...",
        example: "I am currently driving a comprehensive overhaul of our quality systems.",
        exampleVi: "Tôi hiện đang dẫn dắt một cuộc cải tổ toàn diện các hệ thống chất lượng của chúng ta.",
        collocationTip: "'Overhaul' thể hiện quy mô tác động mạnh hơn nhiều so với 'change'."
      },
      {
        phrase: "cut risks across the board",
        ipa: "/kʌt rɪsks əˈkrɒs ðə bɔːrd/",
        meaningVi: "Giảm thiểu rủi ro trên mọi phương diện / toàn diện",
        example: "Our standardized protocol cut operational errors across the board.",
        exampleVi: "Quy chuẩn mới của chúng tôi đã cắt giảm sai sót vận hành trên mọi phương diện.",
        collocationTip: "'Across the board' là cụm từ cao cấp chỉ sự đồng bộ diện rộng."
      },
      {
        phrase: "put on someone's radar",
        ipa: "/pʊt ɒn ˈsʌmwʌnz ˈreɪdɑːr/",
        meaningVi: "Đưa vào tầm chú ý / mối quan tâm của ai",
        example: "I just wanted to put this high-potential initiative on your radar.",
        exampleVi: "Tôi chỉ muốn đưa sáng kiến đầy tiềm năng này vào tầm chú ý của anh/chị.",
        collocationTip: "Cách xin ý kiến lãnh đạo tinh tế, không mang tính nài nỉ."
      }
    ],
    shadowingDrills: [
      {
        id: "d85-s1",
        text: "I'd love to put our team's latest efficiency breakthroughs on your radar whenever you have ten minutes.",
        translationVi: "Tôi rất mong được báo cáo những đột phá hiệu suất mới nhất của đội ngũ với anh bất cứ khi nào anh có 10 phút.",
        intonationTip: "Năng lượng tích cực, ngắn gọn, cuốn hút.",
        speakerRole: "Emerging Leader"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Một nhà đầu tư bắt tay bạn và hỏi: 'So what makes your team truly unique?'",
      challengePromptEn: "Give an inspiring answer using 'across the board' or 'drive an overhaul'.",
      sampleReflexA2: "We work faster and have very good experience.",
      sampleReflexB1: "What sets us apart is our relentless focus on execution—we don't just innovate on paper, we drive tangible efficiency overhauls that impact the bottom line across the board.",
      pedagogicalKey: "Khắc sâu năng lực định vị giá trị bản thân trong vòng 5 giây."
    }
  },

  {
    day: 90,
    month: 3,
    titleEn: "The 90-Day Graduation: Effortless Spontaneous Fluency",
    titleVi: "Lễ Tốt Nghiệp 90 Ngày: Giao tiếp Phản xạ Đỉnh cao Không Rào Cản",
    theme: "Capstone Reflex Mastery & Future Horizons",
    cefrFocus: "B1 → B1+",
    scenarioDescription: "Buổi phỏng vấn và trò chuyện truyền cảm hứng tổng kết hành trình 90 ngày cùng Giáo sư SLA. Bạn nhìn lại hành trình bứt phá từ A2 lên B1+ trôi chảy.",
    aiPersonaRole: "Professor Henderson - Honorary SLA Chair & Mentor",
    userRole: "Confident B1+ English Speaker celebrating true communicative breakthrough",
    roleplayGoal: "Thảo luận tự nhiên, chia sẻ tầm nhìn tương lai, tự tin giao tiếp quốc tế mà không còn e ngại mắc lỗi ngữ pháp nhỏ.",
    initialAiGreeting: {
      en: "Congratulations on reaching Day 90! Looking back from Day 1 to right now, how has your confidence and speaking reflex transformed?",
      vi: "Chúc mừng bạn đã cán đích Ngày 90! Nhìn lại từ Ngày 1 cho đến khoảnh khắc này, sự tự tin và phản xạ nói của bạn đã chuyển biến thế nào?",
      suggestedA2: "I feel so proud! Now I can speak English without fear and talk with anyone.",
      suggestedB1: "Honestly, it has been an absolute game changer! I no longer translate in my head, and speaking English has truly become second nature to me."
    },
    chunks: [
      {
        phrase: "an absolute game changer",
        ipa: "/ən ˈæbsəluːt ɡeɪm ˈtʃeɪndʒər/",
        meaningVi: "Một bước ngoặt thay đổi hoàn toàn cục diện",
        example: "Practicing speech aloud every single day was an absolute game changer for me.",
        exampleVi: "Luyện nói thành tiếng mỗi ngày thực sự là bước ngoặt thay đổi hoàn toàn cục diện đối với tôi.",
        collocationTip: "Diễn tả sự tiến bộ vượt bậc mang tính đột phá."
      },
      {
        phrase: "become second nature",
        ipa: "/bɪˈkʌm ˈsɛkənd ˈneɪtʃər/",
        meaningVi: "Trở thành phản xạ tự nhiên như hơi thở",
        example: "Responding in English without mental translation has become second nature.",
        exampleVi: "Phản hồi bằng tiếng Anh mà không cần dịch thầm đã trở thành phản xạ tự nhiên như hơi thở.",
        collocationTip: "Cảnh giới cao nhất của phương pháp Tiếp thu Ngôn ngữ Tự nhiên (SLA)."
      },
      {
        phrase: "the sky is the limit",
        ipa: "/ðə skaɪ ɪz ðə ˈlɪmɪt/",
        meaningVi: "Không còn giới hạn nào nữa / Tương lai rộng mở",
        example: "With this newfound fluency, the sky is the limit for your career.",
        exampleVi: "Với sự trôi chảy mới này, tương lai sự nghiệp của bạn sẽ không còn bất kỳ giới hạn nào.",
        collocationTip: "Lời chúc mừng và khẳng định tầm vóc tương lai rực rỡ."
      }
    ],
    shadowingDrills: [
      {
        id: "d90-s1",
        text: "Consistency was challenging at times, but speaking English with confidence has genuinely become second nature to me.",
        translationVi: "Duy trì kỷ luật đôi khi không dễ, nhưng cất tiếng nói tiếng Anh một cách tự tin giờ đây đã thực sự trở thành phản xạ tự nhiên của tôi.",
        intonationTip: "Tự hào, trầm ấm, truyền cảm hứng và đĩnh đạc.",
        speakerRole: "Graduate Speaker"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Giáo sư hỏi bạn câu hỏi cuối cùng: 'What is your golden advice for someone starting at Day 1?'",
      challengePromptEn: "Share your golden rule about fluency over accuracy and daily consistency.",
      sampleReflexA2: "Practice every day, speak loudly, and don't be afraid to make mistakes!",
      sampleReflexB1: "Don't obsess over minor grammar slips; prioritize fluency, speak out loud every day, and trust the SLA process completely!",
      pedagogicalKey: "Bậc thầy phản xạ giao tiếp đã hoàn thành trọn vẹn hành trình 90 ngày."
    }
  }
];

// Helper converting compact blueprints into full DayLesson objects
function convertCompactToDayLesson(b: CompactDayBlueprint): DayLesson {
  const month: 1 | 2 | 3 = b.day <= 30 ? 1 : b.day <= 60 ? 2 : 3;
  const cefr: 'A2 → B1' | 'B1' | 'B1 → B1+' =
    month === 1 ? 'A2 → B1' : month === 2 ? 'B1' : 'B1 → B1+';
  const chunks: LexicalChunk[] = b.chunks.map(
    ([phrase, ipa, meaningVi, example, exampleVi, collocationTip]) => ({
      phrase,
      ipa,
      meaningVi,
      example,
      exampleVi,
      collocationTip,
    })
  );
  return {
    day: b.day,
    month,
    titleEn: b.titleEn,
    titleVi: b.titleVi,
    theme: b.theme,
    cefrFocus: cefr,
    scenarioDescription: b.scenarioDescription,
    aiPersonaRole: b.aiPersonaRole,
    userRole: b.userRole,
    roleplayGoal: b.roleplayGoal,
    initialAiGreeting: {
      en: b.greetingEn,
      vi: b.greetingVi,
      suggestedA2: b.suggestedA2,
      suggestedB1: b.suggestedB1,
    },
    chunks,
    shadowingDrills: [
      {
        id: `d${b.day}-s1`,
        text: b.chunks[0] ? b.chunks[0][3] : b.suggestedB1,
        translationVi: b.chunks[0] ? b.chunks[0][4] : b.greetingVi,
        intonationTip: 'Nhấn mạnh vào các cụm từ trọng tâm và hạ giọng tự nhiên ở cuối câu.',
        speakerRole: b.aiPersonaRole.split(' - ')[0] || 'Partner',
      },
      {
        id: `d${b.day}-s2`,
        text: b.suggestedB1,
        translationVi: b.suggestedA2,
        intonationTip: 'Ngữ điệu tự tin, nhả chữ dứt khoát theo nhịp điệu bản ngữ.',
        speakerRole: 'Learner',
      },
    ],
    bedtimeReflex: {
      scenarioVi: `Tình huống phản xạ nhanh Ngày ${b.day}: ${b.roleplayGoal}`,
      challengePromptEn: `Respond tactfully using "${b.chunks[0]?.[0] || 'target chunks'}".`,
      sampleReflexA2: b.suggestedA2,
      sampleReflexB1: b.suggestedB1,
      pedagogicalKey: b.roleplayGoal,
    },
  };
}

// Bảng dữ liệu 90 ngày đồng nhất, ưu tiên bài học thực chiến chuyên sâu
const lessonMap = new Map<number, DayLesson>();

for (const blueprint of ADDITIONAL_75_DAYS_CATALOG) {
  lessonMap.set(blueprint.day, convertCompactToDayLesson(blueprint));
}

for (const flagship of FLAGSHIP_LESSONS) {
  lessonMap.set(flagship.day, flagship);
}

for (const executive of EXECUTIVE_ADVANCED_LESSONS) {
  lessonMap.set(executive.day, executive);
}

export const CURRICULUM_DATA: DayLesson[] = Array.from(lessonMap.values()).sort(
  (a, b) => a.day - b.day
);

// Helper to get or generate full 90-day lessons dynamically
export function getLessonForDay(dayNumber: number): DayLesson {
  const existing = CURRICULUM_DATA.find((l) => l.day === dayNumber);
  if (existing) return existing;

  const month: 1 | 2 | 3 = dayNumber <= 30 ? 1 : dayNumber <= 60 ? 2 : 3;
  const cefr: 'A2 → B1' | 'B1' | 'B1 → B1+' =
    month === 1 ? 'A2 → B1' : month === 2 ? 'B1' : 'B1 → B1+';

  const month1Topics = [
    { en: "Weekend Getaways & Nature Walks", vi: "Chuyến dã ngoại cuối tuần & Đi dạo ngắm thiên nhiên" },
    { en: "Booking a Doctor's Appointment & Explaining Symptoms", vi: "Hẹn khám bệnh & Mô tả triệu chứng cơ thể" },
    { en: "Shopping for Clothes & Asking for Sizes", vi: "Mua sắm quần áo & Hỏi cỡ đồ phù hợp" },
    { en: "At the Gym & Workout Advice", vi: "Tập luyện thể thao & Lời khuyên thể hình" },
    { en: "Cooking a Meal & Following Recipes", vi: "Nấu nướng bạn bè & Hướng dẫn công thức" },
    { en: "Talking About Hobbies & Crafts", vi: "Nói về thú vui tao nhã & Đồ thủ công" },
    { en: "Bank & Currency Exchange Transactions", vi: "Giao dịch ngân hàng & Đổi ngoại tệ" },
    { en: "Airport Check-In & Luggage Rules", vi: "Làm thủ tục sân bay & Quy định hành lý" },
    { en: "Calling Customer Service & Inquiring Bills", vi: "Gọi chăm sóc khách hàng & Tra cứu hóa đơn" },
    { en: "Returning an Item & Asking for a Refund", vi: "Đổi trả hàng hóa & Yêu cầu hoàn tiền khéo léo" },
    { en: "Pet Care & Veterinary Checkup", vi: "Chăm sóc thú cưng & Đưa cún miu đi khám" },
    { en: "At the Library or Bookstore", vi: "Tìm sách tại thư viện & Hiệu sách quen" },
    { en: "Neighborly Chat & Community Life", vi: "Trò chuyện thân tình với hàng xóm láng giềng" },
    { en: "Weather Forecast & Planning Outdoor Events", vi: "Dự báo thời tiết & Lên lịch hoạt động ngoài trời" },
    { en: "Celebrating Birthdays & Toasting Friends", vi: "Tiệc sinh nhật & Nâng ly chúc mừng bạn hữu" },
    { en: "Public Parks & Leisure Sports", vi: "Công viên dạo bộ & Thể thao giải trí" },
    { en: "Family Traditions & Festive Holidays", vi: "Truyền thống gia đình & Ngày lễ tết sum vầy" },
    { en: "Renting a Bike or Car", vi: "Thuê xe đạp hoặc ô tô tự lái" },
    { en: "Museum Visits & Appreciating Art", vi: "Thưởng ngoạn nghệ thuật & Bình luận tranh ảnh" },
    { en: "Month 1 Milestone Check & Fluid Conversations", vi: "Cột mốc Tháng 1: Hội thoại tự nhiên không ngắt quãng" }
  ];

  const month2Topics = [
    { en: "Pitching an Idea to Your Teammates", vi: "Trình bày ý tưởng mới trước đồng nghiệp" },
    { en: "Negotiating Deadlines with Stakeholders", vi: "Thương lượng thời hạn giao việc với đối tác" },
    { en: "Giving Constructive Feedback to a Peer", vi: "Đóng góp ý kiến xây dựng cho bạn đồng nghiệp" },
    { en: "Receiving Critique Without Becoming Defensive", vi: "Đón nhận lời phê bình một cách điềm tĩnh và cầu thị" },
    { en: "Networking at an Industry Conference", vi: "Kết nối đối tác tại hội nghị chuyên ngành" },
    { en: "Organizing an Office Social Event", vi: "Tổ chức tiệc gắn kết tinh thần công ty" },
    { en: "Business Travel Itinerary & Car Rentals", vi: "Lịch trình công tác & Thuê xe doanh nghiệp" },
    { en: "Job Interview: Strengths & Weaknesses", vi: "Phỏng vấn việc làm: Điểm mạnh & Điểm cần cải thiện" },
    { en: "Handling Client Complaints with Tact", vi: "Xử lý khiếu nại khách hàng với sự thấu cảm" },
    { en: "Brainstorming Product Improvements", vi: "Thảo luận ý tưởng cải tiến sản phẩm" },
    { en: "Expressing Concerns in a Team Standup", vi: "Nêu quan ngại một cách văn minh trong buổi họp nhanh" },
    { en: "Explaining Technical Glitches to Non-Tech Clients", vi: "Giải thích lỗi kỹ thuật cho khách hàng dễ hiểu" },
    { en: "Discussing Salary & Career Growth Path", vi: "Trao đổi lộ trình thăng tiến & Chế độ đãi ngộ" },
    { en: "Cross-Cultural Communication at Work", vi: "Giao tiếp liên văn hóa nơi công sở đa quốc gia" },
    { en: "Month 2 Milestone: Workplace Agility Review", vi: "Cột mốc Tháng 2: Đánh giá độ nhạy bén nơi công sở" }
  ];

  const month3Topics = [
    { en: "Sharing Memorable Childhood Anecdotes", vi: "Kể lại những mẩu chuyện tuổi thơ đáng nhớ" },
    { en: "Discussing Global Trends & Future AI Impact", vi: "Thảo luận xu hướng toàn cầu & Tác động của AI" },
    { en: "Tactful Negotiation & Win-Win Solutions", vi: "Đàm phán khéo léo & Giải pháp đôi bên cùng có lợi" },
    { en: "Expressing Empathy & Deep Emotional Support", vi: "Bày tỏ sự đồng cảm & Nâng đỡ tinh thần chân thành" },
    { en: "Handling Difficult Questions on the Spot", vi: "Xử lý câu hỏi hóc búa ứng biến tức thì" },
    { en: "Presenting Data & Inspiring With Charts", vi: "Thuyết trình số liệu & Truyền cảm hứng bằng biểu đồ" },
    { en: "Debating Work-Life Balance vs Hustle Culture", vi: "Tranh biện về cân bằng cuộc sống và cống hiến sự nghiệp" },
    { en: "Humor, Irony & Sarcasm in English", vi: "Sử dụng sự hóm hỉnh, châm biếm nhẹ nhàng tự nhiên" },
    { en: "Mastering Metaphors & Idiomatic Wit", vi: "Làm chủ phép ẩn dụ & Lối chơi chữ thông minh" },
    { en: "Global Citizenship & Cultural Perspectives", vi: "Tư duy công dân toàn cầu & Tôn trọng sự đa dạng" },
    { en: "Elevator Pitch: Your 60-Second Life Vision", vi: "Bản giới thiệu thang máy 60 giây: Khắc họa tầm nhìn" },
    { en: "The Power of Active Listening in High-Stakes Talks", vi: "Sức mạnh của lắng nghe chủ động trong thương thuyết quan trọng" }
  ];

  let topic = { en: `Day ${dayNumber} SLA Immersion`, vi: `Ngày ${dayNumber}: Luyện phản xạ chuyên sâu` };
  if (month === 1) {
    topic = month1Topics[(dayNumber - 1) % month1Topics.length] || topic;
  } else if (month === 2) {
    topic = month2Topics[(dayNumber - 31) % month2Topics.length] || topic;
  } else {
    topic = month3Topics[(dayNumber - 61) % month3Topics.length] || topic;
  }

  return {
    day: dayNumber,
    month,
    titleEn: topic.en,
    titleVi: topic.vi,
    theme: `Reflex Level: ${cefr} - Communication Dynamics`,
    cefrFocus: cefr,
    scenarioDescription: `Tình huống tương tác thực tế Ngày ${dayNumber}: Bạn đang thảo luận về ${topic.vi.toLowerCase()} cùng các đối tác nước ngoài.`,
    aiPersonaRole: `SLA Conversational Coach for Day ${dayNumber}`,
    userRole: `Active Learner mastering Day ${dayNumber} reflex`,
    roleplayGoal: `Duy trì mạch hội thoại tự nhiên, vận dụng ít nhất 2 cụm collocations và phản hồi trôi chảy trong vòng 3-5 giây.`,
    initialAiGreeting: {
      en: `Welcome to Day ${dayNumber}! Today we're exploring: "${topic.en}". How have you been feeling about your speaking reflex so far?`,
      vi: `Chào mừng bạn đến với Ngày ${dayNumber}! Hôm nay chúng ta sẽ cùng khám phá chủ đề: "${topic.vi}". Bạn cảm thấy phản xạ nói của mình gần đây ra sao?`,
      suggestedA2: `I feel much more confident now. I am ready to practice today's topic!`,
      suggestedB1: `I've definitely noticed a clear boost in my conversational cadence, and I'm eager to tackle today's scenario!`
    },
    chunks: [
      {
        phrase: "make steady progress",
        ipa: "/meɪk ˈstɛdi ˈproʊɡrɛs/",
        meaningVi: "Tiến bộ đều đặn và vững chắc",
        example: "I am making steady progress day by day.",
        exampleVi: "Tôi đang tiến bộ vững chắc qua từng ngày.",
        collocationTip: "Thể hiện sự kiên trì bền bỉ."
      },
      {
        phrase: "get the hang of it",
        ipa: "/ɡɛt ðə hæŋ əv ɪt/",
        meaningVi: "Dần quen tay / nắm bắt được bí quyết",
        example: "Don't worry, you'll get the hang of it very soon.",
        exampleVi: "Đừng lo, bạn sẽ sớm nắm bắt được phản xạ tự nhiên thôi.",
        collocationTip: "Thành ngữ khẩu ngữ rất phổ biến của người bản xứ."
      },
      {
        phrase: "in the long run",
        ipa: "/ɪn ðə lɒŋ rʌn/",
        meaningVi: "Về lâu về dài / Xét về đường dài",
        example: "Daily consistency pays off in the long run.",
        exampleVi: "Sự kiên trì rèn luyện mỗi ngày sẽ đem lại trái ngọt về lâu dài.",
        collocationTip: "Dùng để nhấn mạnh giá trị của kỷ luật bản thân."
      }
    ],
    shadowingDrills: [
      {
        id: `d${dayNumber}-s1`,
        text: `Daily consistency pays off in the long run if you stay focused.`,
        translationVi: `Sự kiên trì mỗi ngày chắc chắn sẽ đem lại thành quả lớn về lâu dài nếu bạn luôn giữ vững sự tập trung.`,
        intonationTip: `Nhấn mạnh vào 'pays off' và 'long run'.`,
        speakerRole: `SLA Professor`
      }
    ],
    bedtimeReflex: {
      scenarioVi: `Người đối diện hỏi: 'What is the key takeaway from your lesson today?'`,
      challengePromptEn: `Answer using 'get the hang of it' or 'steady progress'.`,
      sampleReflexA2: `I am making steady progress every day.`,
      sampleReflexB1: `I feel like I'm finally getting the hang of natural English rhythm without translating in my head!`,
      pedagogicalKey: `Duy trì tư duy thành công và kích hoạt củng cố trí nhớ dài hạn trước khi ngủ.`
    }
  };
}