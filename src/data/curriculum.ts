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
  cefrFocus: 'A2 → B1' | 'B1' | 'B1 → B1+';
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

// 90-Day Curated SLA Roadmap
export const CURRICULUM_DATA: DayLesson[] = [
  // ================= MONTH 1: DAYS 1 - 30 (Phá vỡ rào cản & Giao tiếp sinh hoạt cơ bản) =================
  {
    day: 1,
    month: 1,
    titleEn: "Breaking the Ice & Self-Introduction",
    titleVi: "Phá vỡ rào cản e ngại & Giới thiệu bản thân tự nhiên",
    theme: "Personal Identity & Daily Passion",
    cefrFocus: "A2 → B1",
    scenarioDescription: "Bạn vừa tham gia một buổi giao lưu quốc tế (International Meetup). AI là một người bạn nước ngoài thân thiện bắt chuyện với bạn bên quầy trà.",
    aiPersonaRole: "Alex - Friendly international community organizer",
    userRole: "New member attending their first social meetup",
    roleplayGoal: "Giới thiệu bản thân trôi chảy trong 3 câu, nói về sở thích mà không dùng mẫu câu cứng nhắc 'My name is... I am... years old'.",
    initialAiGreeting: {
      en: "Hi there! I don't think we've met yet. I'm Alex. What brought you to this meetup tonight?",
      vi: "Chào bạn! Hình như chúng mình chưa gặp nhau thì phải. Mình là Alex. Cơ duyên nào đưa bạn đến buổi giao lưu tối nay thế?",
      suggestedA2: "Hi Alex! Nice to meet you. I want to practice my English and make new friends.",
      suggestedB1: "Hey Alex, great to meet you! To be honest, I'm trying to step out of my comfort zone and sharpen my English speaking skills."
    },
    chunks: [
      {
        phrase: "step out of my comfort zone",
        ipa: "/stɛp aʊt əv maɪ ˈkʌmfərt zoʊn/",
        meaningVi: "Bước ra khỏi vùng an toàn của bản thân",
        example: "I decided to join this club to step out of my comfort zone.",
        exampleVi: "Tôi quyết định tham gia câu lạc bộ này để bước ra khỏi vùng an toàn.",
        collocationTip: "Dùng để thể hiện sự dũng cảm thử thách điều mới."
      },
      {
        phrase: "be really into something",
        ipa: "/bi ˈrɪəli ˈɪntuː ˈsʌmθɪŋ/",
        meaningVi: "Cực kỳ thích / mê mẩn điều gì (tự nhiên hơn 'I like')",
        example: "Lately, I've been really into acoustic music and photography.",
        exampleVi: "Dạo gần đây, mình cực mê nhạc acoustic và nhiếp ảnh.",
        collocationTip: "Thay thế tuyệt vời cho 'I like/I love'."
      },
      {
        phrase: "what brought you to...?",
        ipa: "/wʌt brɔːt juː tuː/",
        meaningVi: "Điều gì đã đưa bạn đến đây? (Hỏi lý do rất lịch sự)",
        example: "What brought you to live in this city?",
        exampleVi: "Cơ duyên nào đưa bạn đến sinh sống ở thành phố này?",
        collocationTip: "Chuẩn giao tiếp bản ngữ hơn là 'Why do you come here?'"
      },
      {
        phrase: "to be honest with you",
        ipa: "/tə bi ˈɒnɪst wɪð juː/",
        meaningVi: "Thành thật mà nói thì...",
        example: "To be honest with you, I was a bit nervous at first.",
        exampleVi: "Thành thật mà nói, lúc đầu tôi hơi run một chút.",
        collocationTip: "Cụm đệm (filler phrase) giúp câu nói tự nhiên và có thời gian nghĩ ý."
      }
    ],
    shadowingDrills: [
      {
        id: "d1-s1",
        text: "Hi there! I don't think we've met yet. I'm Alex.",
        translationVi: "Chào bạn! Hình như chúng ta chưa gặp nhau. Tôi là Alex.",
        intonationTip: "Lên giọng nhẹ ở 'yet' ↗ rồi hạ giọng dứt khoát ở 'Alex' ↘.",
        linkingTip: "Nối âm: don't_think, we've_met.",
        speakerRole: "Alex (Native Speaker)"
      },
      {
        id: "d1-s2",
        text: "I'm trying to step out of my comfort zone and improve my speaking.",
        translationVi: "Tôi đang cố bước ra khỏi vùng an toàn và nâng cao kỹ năng nói.",
        intonationTip: "Nhấn mạnh vào 'step out' và 'comfort zone'.",
        linkingTip: "Nối âm: step_out_of.",
        speakerRole: "Learner (Model Tone)"
      },
      {
        id: "d1-s3",
        text: "Lately, I've been really into photography in my free time.",
        translationVi: "Dạo gần đây mình cực kỳ đam mê nhiếp ảnh lúc rảnh rỗi.",
        intonationTip: "Ngắt nhẹ sau 'Lately,', lên giọng ở 'photography'.",
        linkingTip: "Nối âm: really_into.",
        speakerRole: "Learner (Model Tone)"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Một đồng nghiệp người nước ngoài hỏi bạn: 'So, how was your first day here?'",
      challengePromptEn: "Answer within 5 seconds using 'To be honest' and 'step out of my comfort zone'.",
      sampleReflexA2: "To be honest, it was busy, but I am happy to be here.",
      sampleReflexB1: "To be honest, it felt like stepping out of my comfort zone, but everyone has been super welcoming!",
      pedagogicalKey: "Phản xạ không cần dịch nhẩm cấu trúc ngữ pháp phức tạp."
    }
  },
  {
    day: 2,
    month: 1,
    titleEn: "Ordering Coffee & Customizing Drinks",
    titleVi: "Gọi cà phê & Tùy biến món uống như người bản xứ",
    theme: "Cafe Culture & Specific Requests",
    cefrFocus: "A2 → B1",
    scenarioDescription: "Bạn đang ở một quán cafe đông đúc tại trung tâm Sydney. Người pha chế hỏi nhanh bạn muốn uống gì.",
    aiPersonaRole: "Sam - Energetic Sydney Barista",
    userRole: "Customer ordering morning coffee with custom milk and less ice",
    roleplayGoal: "Đặt món trôi chảy, yêu cầu ít đường, đổi sữa hạt và hỏi xin mật khẩu Wi-Fi mà không bị bỡ ngỡ.",
    initialAiGreeting: {
      en: "Morning! What can I get started for you today?",
      vi: "Chào buổi sáng! Mình làm món gì cho bạn hôm nay nào?",
      suggestedA2: "Can I have an iced latte with less sugar, please?",
      suggestedB1: "Could I get a medium iced latte with oat milk, easy on the ice?"
    },
    chunks: [
      {
        phrase: "easy on the ice / sugar",
        ipa: "/ˈiːzi ɒn ði aɪs/",
        meaningVi: "Cho ít đá / ít đường thôi nhé",
        example: "Can I get an iced Americano, easy on the ice?",
        exampleVi: "Cho mình một cốc Americano đá, ít đá thôi nhé?",
        collocationTip: "Cụm cực kỳ chuẩn người bản ngữ thay cho 'less ice'."
      },
      {
        phrase: "can I get / could I get...",
        ipa: "/kʊd aɪ ɡɛt/",
        meaningVi: "Cho tôi một... (Lịch sự, tự nhiên hơn 'Give me')",
        example: "Could I get that to go, please?",
        exampleVi: "Cho mình mang đi nhé?",
        collocationTip: "Mẫu câu vàng khi gọi món ở các nước Anh-Mỹ-Úc."
      },
      {
        phrase: "to go / for here",
        ipa: "/tə ɡoʊ / fɔːr hɪər/",
        meaningVi: "Mang đi hay dùng tại quán",
        example: "Is that for here or to go?",
        exampleVi: "Bạn dùng tại đây hay mang đi?",
        collocationTip: "Ở Anh hay dùng 'take away / eat in'."
      },
      {
        phrase: "substitute with oat milk",
        ipa: "/ˈsʌbstɪtjuːt wɪð oʊt mɪlk/",
        meaningVi: "Đổi sang sữa yến mạch",
        example: "Is it possible to substitute with oat milk?",
        exampleVi: "Có thể đổi sang sữa yến mạch được không ạ?",
        collocationTip: "Dùng linh hoạt khi muốn đổi topping hay thành phần."
      }
    ],
    shadowingDrills: [
      {
        id: "d2-s1",
        text: "Morning! What can I get started for you today?",
        translationVi: "Chào buổi sáng! Mình làm món gì cho bạn hôm nay nào?",
        intonationTip: "Tươi vui, lên giọng ở 'today' ↗.",
        linkingTip: "Nối âm: get_started_for.",
        speakerRole: "Sam (Barista)"
      },
      {
        id: "d2-s2",
        text: "Could I get a medium flat white with oat milk, please?",
        translationVi: "Cho mình một cốc flat white vừa với sữa yến mạch nhé?",
        intonationTip: "Lên giọng lịch sự ở cuối câu 'please?' ↗.",
        linkingTip: "Nối âm: Could_I, flat_white.",
        speakerRole: "Learner (Model Tone)"
      },
      {
        id: "d2-s3",
        text: "Make it easy on the syrup, if possible.",
        translationVi: "Cho ít si-rô thôi nhé, nếu được.",
        intonationTip: "Hạ giọng nhẹ ở 'if possible' ↘.",
        linkingTip: "Nối âm: easy_on_the.",
        speakerRole: "Learner (Model Tone)"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Nhân viên quán hỏi: 'For here or to go, and any milk preferences?'",
      challengePromptEn: "Respond immediately specifying 'to go' and 'oat milk'.",
      sampleReflexA2: "To go, please! And oat milk.",
      sampleReflexB1: "To go, please! And could you swap the regular milk for oat milk?",
      pedagogicalKey: "Hình thành phản xạ gọi món ăn uống không vấp váp."
    }
  },
  {
    day: 3,
    month: 1,
    titleEn: "Asking & Following Street Directions",
    titleVi: "Hỏi đường & Định vị không gian không sợ lạc lối",
    theme: "Urban Navigation & Spatial Awareness",
    cefrFocus: "A2 → B1",
    scenarioDescription: "Bạn đang ở khu phố cổ Edinburgh và muốn tìm ga tàu gần nhất trước khi trời mưa to.",
    aiPersonaRole: "Liam - Scottish local pedestrian",
    userRole: "Lost traveler looking for the central railway station",
    roleplayGoal: "Hỏi đường lịch sự, xác nhận lại thông tin và hỏi mất bao lâu đi bộ.",
    initialAiGreeting: {
      en: "Excuse me! You look a bit turned around. Are you looking for something around here?",
      vi: "Xin lỗi! Trông bạn có vẻ hơi lạc đường. Bạn đang tìm địa điểm nào quanh đây à?",
      suggestedA2: "Yes! Can you tell me the way to the central train station?",
      suggestedB1: "Oh thank goodness! I'm trying to get to the main station, but my GPS is acting up."
    },
    chunks: [
      {
        phrase: "my GPS is acting up",
        ipa: "/maɪ ˌdʒiː piː ˈɛs ɪz ˈæktɪŋ ʌp/",
        meaningVi: "Định vị GPS của tôi đang bị chập cờn / dở chứng",
        example: "My phone is acting up, could you guide me?",
        exampleVi: "Điện thoại tôi đang bị dở chứng, bạn chỉ đường giúp tôi được không?",
        collocationTip: "'Act up' dùng cho máy móc hoặc cơ thể bị đau mỏi."
      },
      {
        phrase: "within walking distance",
        ipa: "/wɪˈðɪn ˈwɔːkɪŋ ˈdɪstəns/",
        meaningVi: "Trong khoảng cách có thể đi bộ được",
        example: "Is the station within walking distance?",
        exampleVi: "Ga tàu có gần tới mức đi bộ được không?",
        collocationTip: "Cụm cực hay để hỏi khoảng cách thay vì hỏi 'How many km?'"
      },
      {
        phrase: "you can't miss it",
        ipa: "/juː kɑːnt mɪs ɪt/",
        meaningVi: "Bạn không thể đi lạc / bỏ sót nó được đâu (nó rất dễ thấy)",
        example: "It's right next to the red brick church; you can't miss it!",
        exampleVi: "Nó ngay cạnh nhà thờ gạch đỏ, bạn không thể nhầm được đâu!",
        collocationTip: "Thành ngữ chỉ đường phổ biến nhất thế giới nói tiếng Anh."
      },
      {
        phrase: "hang a left / hang a right",
        ipa: "/hæŋ ə lɛft/",
        meaningVi: "Rẽ trái / rẽ phải (ngôn ngữ đường phố tự nhiên)",
        example: "Go two blocks and hang a left.",
        exampleVi: "Đi qua hai dãy nhà rồi rẽ trái nhé.",
        collocationTip: "Tự nhiên hơn nhiều so với chỉ lặp đi lặp lại 'turn left'."
      }
    ],
    shadowingDrills: [
      {
        id: "d3-s1",
        text: "Just head straight down this road and hang a right at the traffic lights.",
        translationVi: "Cứ đi thẳng đường này rồi rẽ phải ở cột đèn giao thông.",
        intonationTip: "Nhịp điệu dứt khoát: 'head straight' -> 'hang a right'.",
        linkingTip: "Nối âm: hang_a_right.",
        speakerRole: "Liam (Local)"
      },
      {
        id: "d3-s2",
        text: "Is it within walking distance or should I take a cab?",
        translationVi: "Chỗ đó có đi bộ được không hay tôi nên bắt taxi?",
        intonationTip: "Lên giọng ở 'walking distance' ↗, hạ giọng ở 'take a cab' ↘.",
        linkingTip: "Nối âm: within_walking, take_a.",
        speakerRole: "Learner (Model Tone)"
      },
      {
        id: "d3-s3",
        text: "It's about a five-minute walk. You can't miss it!",
        translationVi: "Chỉ khoảng năm phút đi bộ thôi. Bạn không thể đi lạc được đâu!",
        intonationTip: "Nhấn mạnh tự tin ở 'can't miss it'.",
        linkingTip: "Nối âm: miss_it.",
        speakerRole: "Liam (Local)"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Ai đó hỏi bạn: 'Is the pharmacy far from here?'",
      challengePromptEn: "Answer that it is within walking distance and just across the street.",
      sampleReflexA2: "No, it is very close. Just across the street.",
      sampleReflexB1: "Not at all, it's well within walking distance—just right across the street!",
      pedagogicalKey: "Sử dụng 'well within walking distance' tự nhiên như bản ngữ."
    }
  },
  {
    day: 4,
    month: 1,
    titleEn: "Supermarket & Grocery Shopping Nuances",
    titleVi: "Mua sắm siêu thị & Hỏi vị trí hàng hóa tinh tế",
    theme: "Everyday Purchases & Practical Inquiries",
    cefrFocus: "A2 → B1",
    scenarioDescription: "Bạn đang tìm một số loại gia vị và sữa chua không đường trong một siêu thị lớn ở Los Angeles.",
    aiPersonaRole: "Clara - Helpful Grocery store clerk",
    userRole: "Shopper looking for specific food items and checkout options",
    roleplayGoal: "Hỏi lối đi (aisle), hạn sử dụng, và thanh toán bằng thẻ hay tiền mặt.",
    initialAiGreeting: {
      en: "Hi! Can I help you find anything, or are you just browsing?",
      vi: "Chào bạn! Tôi có thể giúp bạn tìm món gì không, hay bạn chỉ đang xem qua thôi?",
      suggestedA2: "Can you help me find the dairy section, please?",
      suggestedB1: "Hi! I was wondering if you could point me to the unsweetened yogurt aisle?"
    },
    chunks: [
      {
        phrase: "point me in the direction of...",
        ipa: "/pɔɪnt miː ɪn ðə daɪˈrɛkʃən əv/",
        meaningVi: "Chỉ cho tôi hướng tới quầy...",
        example: "Could you point me in the direction of the fresh bakery?",
        exampleVi: "Bạn chỉ hướng đến quầy bánh mì tươi giúp mình được không?",
        collocationTip: "Lịch sự và tinh tế hơn nhiều so với 'Where is the bakery?'"
      },
      {
        phrase: "out of stock",
        ipa: "/aʊt əv stɒk/",
        meaningVi: "Hết hàng tạm thời",
        example: "I'm afraid this brand is currently out of stock.",
        exampleVi: "Tôi e rằng nhãn hiệu này hiện đang hết hàng rồi.",
        collocationTip: "Cụm từ tiêu chuẩn trong thương mại bán lẻ."
      },
      {
        phrase: "grab a quick bite / item",
        ipa: "/ɡræb ə kwɪk baɪt/",
        meaningVi: "Lấy nhanh / mua vội thứ gì đó",
        example: "I just need to grab a few essentials for dinner.",
        exampleVi: "Mình chỉ cần tạt vào mua vài món đồ thiết yếu cho bữa tối.",
        collocationTip: "'Grab' cực kỳ phổ biến trong khẩu ngữ đời sống."
      },
      {
        phrase: "cash or contactless?",
        ipa: "/kæʃ ɔːr ˈkɒntæktləs/",
        meaningVi: "Tiền mặt hay quẹt thẻ một chạm?",
        example: "Are you paying with cash or contactless card?",
        exampleVi: "Bạn thanh toán tiền mặt hay quẹt thẻ chạm?",
        collocationTip: "Thẻ chạm (Apple Pay, chip) được dùng rộng rãi."
      }
    ],
    shadowingDrills: [
      {
        id: "d4-s1",
        text: "Could you point me in the direction of the organic produce?",
        translationVi: "Bạn chỉ giúp tôi hướng tới quầy nông sản hữu cơ được không?",
        intonationTip: "Lên giọng nhẹ ở cuối câu hỏi ↗.",
        linkingTip: "Nối âm: point_me, direction_of.",
        speakerRole: "Learner (Model Tone)"
      },
      {
        id: "d4-s2",
        text: "It's over in aisle four, right next to the almond milk.",
        translationVi: "Nó ở lối đi số 4 đằng kia, ngay cạnh quầy sữa hạnh nhân.",
        intonationTip: "Nhấn mạnh số 'four' và 'almond milk'.",
        linkingTip: "Nối âm: over_in, aisle_four.",
        speakerRole: "Clara (Store Clerk)"
      },
      {
        id: "d4-s3",
        text: "Do you accept contactless payments here?",
        translationVi: "Ở đây có nhận thanh toán chạm không ạ?",
        intonationTip: "Lên giọng ở 'here' ↗.",
        linkingTip: "Nối âm: accept_contactless.",
        speakerRole: "Learner (Model Tone)"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Nhân viên thu ngân hỏi: 'Do you have our loyalty membership card today?'",
      challengePromptEn: "Decline politely saying you don't, but will pay by contactless.",
      sampleReflexA2: "No, I don't. Can I pay with card?",
      sampleReflexB1: "I don't have one on me, but I'll be paying contactless, thanks!",
      pedagogicalKey: "'I don't have one on me' - phản xạ tự nhiên của người bản ngữ."
    }
  },
  {
    day: 5,
    month: 1,
    titleEn: "Describing Your Daily Routine & Habits",
    titleVi: "Mô tả nhịp sinh hoạt & Thói quen hàng ngày tràn năng lượng",
    theme: "Daily Life Rhythm & Healthy Routines",
    cefrFocus: "A2 → B1",
    scenarioDescription: "Bạn đang trò chuyện với người bạn trao đổi ngôn ngữ về cách cân bằng giữa công việc và cuộc sống.",
    aiPersonaRole: "Emma - Wellness advocate & language partner",
    userRole: "Busy professional sharing real daily schedules and hobbies",
    roleplayGoal: "Mô tả một ngày điển hình sử dụng các liên từ thời gian và cụm từ tần suất tự nhiên.",
    initialAiGreeting: {
      en: "I've been trying to build a better morning routine. How do your typical weekdays look like?",
      vi: "Dạo này mình đang cố xây dựng thói quen buổi sáng tốt hơn. Ngày trong tuần bình thường của bạn trông như thế nào?",
      suggestedA2: "I usually wake up at 7 AM, make coffee, and then go to work.",
      suggestedB1: "To be honest, I'm an early riser! I usually start my day with a quick stretch and some black coffee."
    },
    chunks: [
      {
        phrase: "an early riser / night owl",
        ipa: "/æn ˈɜːrli ˈraɪzər / naɪt aʊl/",
        meaningVi: "Người dậy sớm (chim sớm) / Cú đêm thức khuya",
        example: "I used to be a night owl, but now I'm definitely an early riser.",
        exampleVi: "Trước đây mình là cú đêm, nhưng giờ chắc chắn là người dậy sớm rồi.",
        collocationTip: "Cách nói cực kỳ sinh động về thói quen sinh học."
      },
      {
        phrase: "wind down in the evening",
        ipa: "/waɪnd daʊn/",
        meaningVi: "Thư giãn, xả hơi vào buổi tối trước khi ngủ",
        example: "I usually read a book or listen to podcasts to wind down.",
        exampleVi: "Mình thường đọc sách hoặc nghe podcast để thư giãn trước khi ngủ.",
        collocationTip: "'Wind down' tự nhiên hơn nhiều so với chỉ nói 'relax'."
      },
      {
        phrase: "on a regular basis",
        ipa: "/ɒn ə ˈrɛɡjʊlər ˈbeɪsɪs/",
        meaningVi: "Một cách đều đặn, thường xuyên",
        example: "I try to hit the gym on a regular basis.",
        exampleVi: "Tôi cố gắng đi tập gym đều đặn.",
        collocationTip: "Cụm danh từ thay thế mượt mà cho trạng từ 'regularly'."
      },
      {
        phrase: "hit the gym / hit the sack",
        ipa: "/hɪt ðə dʒɪm / hɪt ðə sæk/",
        meaningVi: "Đi tập thể hình / Đi ngủ (khẩu ngữ)",
        example: "Around 11 PM, I'm usually ready to hit the sack.",
        exampleVi: "Tầm 11 giờ đêm là mình thường sẵn sàng đi ngủ rồi.",
        collocationTip: "Thành ngữ thông dụng trong giao tiếp hàng ngày."
      }
    ],
    shadowingDrills: [
      {
        id: "d5-s1",
        text: "I usually start my day with a cup of coffee and twenty minutes of reading.",
        translationVi: "Tôi thường bắt đầu ngày mới với một tách cà phê và 20 phút đọc sách.",
        intonationTip: "Lên giọng nhẹ ở 'coffee' ↗, hạ giọng ở 'reading' ↘.",
        linkingTip: "Nối âm: start_my, cup_of.",
        speakerRole: "Learner (Model Tone)"
      },
      {
        id: "d5-s2",
        text: "By the end of the day, I love to wind down without looking at my screen.",
        translationVi: "Đến cuối ngày, tôi thích thư giãn mà không nhìn vào màn hình điện thoại.",
        intonationTip: "Nhấn mạnh 'wind down' và 'screen'.",
        linkingTip: "Nối âm: wind_down, look_at.",
        speakerRole: "Learner (Model Tone)"
      },
      {
        id: "d5-s3",
        text: "Consistency is key if you want to maintain high energy levels.",
        translationVi: "Sự kiên trì đều đặn là chìa khóa nếu bạn muốn duy trì mức năng lượng cao.",
        intonationTip: "Nhấn giọng ở 'Consistency' và 'key'.",
        linkingTip: "Nối âm: Consistency_is, want_to.",
        speakerRole: "Emma (Language Partner)"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Bạn bè hỏi: 'How do you usually relax after a hectic workday?'",
      challengePromptEn: "Answer using 'wind down' and mentioning your favorite hobby.",
      sampleReflexA2: "I usually listen to music to relax after work.",
      sampleReflexB1: "I usually take a hot shower and read a fiction novel to wind down after a crazy day.",
      pedagogicalKey: "Phản xạ dùng 'hectic' và 'wind down' tự nhiên."
    }
  },
  // Day 6 to 10
  {
    day: 6,
    month: 1,
    titleEn: "Dining Out & Expressing Food Preferences",
    titleVi: "Ăn tại nhà hàng & Bày tỏ khẩu vị sành điệu",
    theme: "Culinary Experiences & Dietary Needs",
    cefrFocus: "A2 → B1",
    scenarioDescription: "Bạn đang gọi món tại một nhà hàng hải sản ven biển ở Vancouver với đồng nghiệp.",
    aiPersonaRole: "Marco - Experienced Head Waiter",
    userRole: "Diner with mild seafood allergy asking for chef recommendations",
    roleplayGoal: "Hỏi món đặc sắc của quán, thông báo dị ứng thực phẩm và yêu cầu tính tiền.",
    initialAiGreeting: {
      en: "Good evening! Welcome to Harbor View. Are you ready for some drinks while you look over the menu?",
      vi: "Chào buổi tối! Chào mừng quý khách đến Harbor View. Quý khách có muốn dùng đồ uống trong lúc xem thực đơn không ạ?",
      suggestedA2: "Can I get some sparkling water first, please?",
      suggestedB1: "Good evening! We'll start with sparkling water, and could you tell us about the catch of the day?"
    },
    chunks: [
      {
        phrase: "catch of the day / house special",
        ipa: "/kætʃ əv ðə deɪ/",
        meaningVi: "Món cá tươi vừa đánh bắt trong ngày / Món đặc sản của quán",
        example: "What is the catch of the day today?",
        exampleVi: "Hôm nay món cá tươi trong ngày là gì vậy bạn?",
        collocationTip: "Cụm cực chuẩn khi ăn nhà hàng ẩm thực biển."
      },
      {
        phrase: "I'm mildly allergic to...",
        ipa: "/aɪm ˈmaɪldli əˈlɜːdʒɪk tuː/",
        meaningVi: "Tôi bị dị ứng nhẹ với...",
        example: "Just so you know, I'm mildly allergic to shellfish.",
        exampleVi: "Để bạn biết thì tôi hơi dị ứng nhẹ với các loại hải sản có vỏ.",
        collocationTip: "Bảo vệ sức khỏe và giao tiếp lịch sự rõ ràng."
      },
      {
        phrase: "split the bill / our treat",
        ipa: "/splɪt ðə bɪl/",
        meaningVi: "Chia đều tiền hóa đơn / Để chúng tôi mời",
        example: "Could we split the bill evenly between two cards?",
        exampleVi: "Chúng tôi có thể chia đều hóa đơn cho hai thẻ được không?",
        collocationTip: "Văn hóa thanh toán phổ biến khi đi ăn cùng bạn bè."
      },
      {
        phrase: "on the side",
        ipa: "/ɒn ðə saɪd/",
        meaningVi: "Để riêng ra một đĩa/chén nhỏ bên cạnh (nước sốt, salad)",
        example: "Could I have the dressing on the side, please?",
        exampleVi: "Cho mình xin nước sốt để riêng ra đĩa nhỏ nhé?",
        collocationTip: "Tùy chỉnh món ăn dễ hiểu nhất."
      }
    ],
    shadowingDrills: [
      {
        id: "d6-s1",
        text: "Could you tell us what the house special is tonight?",
        translationVi: "Bạn có thể cho chúng tôi biết món đặc sản tối nay là gì không?",
        intonationTip: "Lên giọng lịch sự ở cuối câu ↗.",
        linkingTip: "Nối âm: Could_you, what_the, is_tonight.",
        speakerRole: "Learner (Model Tone)"
      },
      {
        id: "d6-s2",
        text: "I'm mildly allergic to peanuts, so please make sure the sauce is nut-free.",
        translationVi: "Tôi bị dị ứng nhẹ với đậu phộng, nên nhờ bạn kiểm tra giúp nước sốt không có hạt nhé.",
        intonationTip: "Nhấn mạnh 'peanuts' và 'nut-free'.",
        linkingTip: "Nối âm: allergic_to.",
        speakerRole: "Learner (Model Tone)"
      },
      {
        id: "d6-s3",
        text: "Take your time! Whenever you're ready, just give me a wave.",
        translationVi: "Cứ thong thả nhé! Khi nào sẵn sàng gọi món thì vẫy tay gọi mình nha.",
        intonationTip: "Thân thiện, hạ giọng ở 'wave' ↘.",
        linkingTip: "Nối âm: Take_your, give_me_a.",
        speakerRole: "Marco (Waiter)"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Phục vụ hỏi: 'How was everything with your meal tonight?'",
      challengePromptEn: "Compliment the food and ask for the bill politely.",
      sampleReflexA2: "The food was very good! Can I have the bill?",
      sampleReflexB1: "Everything was absolutely delicious! Whenever you have a moment, could we grab the check?",
      pedagogicalKey: "Dùng 'grab the check / bill' thay vì đòi 'Bill, please!'"
    }
  },
  {
    day: 7,
    month: 1,
    titleEn: "Weekly Review & The Art of Small Talk",
    titleVi: "Ôn tập tuần 1 & Nghệ thuật trò chuyện xã giao (Small Talk)",
    theme: "Active Recall & Weekend Banter",
    cefrFocus: "A2 → B1",
    scenarioDescription: "Thứ Sáu tan sở, bạn đứng đợi thang máy cùng một đồng nghiệp nước ngoài rất cởi mở.",
    aiPersonaRole: "David - Senior Colleague in the London office",
    userRole: "Junior colleague initiating pleasant Friday small talk",
    roleplayGoal: "Hỏi thăm kế hoạch cuối tuần, chia sẻ sở thích và tạo kết nối ấm áp không sượng sùng.",
    initialAiGreeting: {
      en: "TGIF! Can't believe the week is almost over. Got any fun plans lined up for the weekend?",
      vi: "Tạ ơn trời thứ Sáu rồi! Thật không ngờ một tuần trôi qua nhanh thế. Cuối tuần này bạn có kế hoạch thú vị gì chưa?",
      suggestedA2: "Yes, I plan to relax at home and cook with my family.",
      suggestedB1: "Tell me about it! I'm actually planning to keep it low-key and maybe check out a new coffee shop."
    },
    chunks: [
      {
        phrase: "keep it low-key",
        ipa: "/kiːp ɪt loʊ kiː/",
        meaningVi: "Nghỉ ngơi nhẹ nhàng, không tiệc tùng ồn ào",
        example: "I'm just going to keep it low-key this weekend.",
        exampleVi: "Cuối tuần này mình chỉ định nghỉ ngơi nhẹ nhàng thôi.",
        collocationTip: "Cụm từ rất thời thượng và bản ngữ cho giới trẻ và công sở."
      },
      {
        phrase: "tell me about it!",
        ipa: "/tɛl miː əˈbaʊt ɪt/",
        meaningVi: "Chuẩn luôn! / Tôi quá hiểu điều đó rồi (Đồng cảm mạnh mẽ)",
        example: "Traffic was horrible today! - Tell me about it!",
        exampleVi: "Hôm nay đường kẹt kinh khủng! - Chuẩn luôn, tôi cũng vừa kẹt xong!",
        collocationTip: "Không phải bảo người kia kể chuyện, mà là thể hiện sự đồng tình sâu sắc."
      },
      {
        phrase: "got anything lined up?",
        ipa: "/ɡɒt ˈɛnɪθɪŋ laɪnd ʌp/",
        meaningVi: "Bạn đã lên lịch / có kế hoạch gì chưa?",
        example: "Do you have any trips lined up for summer?",
        exampleVi: "Bạn đã lên lịch chuyến đi nào cho mùa hè chưa?",
        collocationTip: "'Line up' tự nhiên hơn nhiều so với 'Do you have plans?'"
      },
      {
        phrase: "catch up on some sleep",
        ipa: "/kætʃ ʌp ɒn sʌm sliːp/",
        meaningVi: "Ngủ bù (cho những ngày thiếu ngủ)",
        example: "I definitely need to catch up on some sleep this Saturday.",
        exampleVi: "Thứ Bảy này chắc chắn mình phải ngủ bù một giấc đã đời.",
        collocationTip: "Dùng 'catch up on' cho công việc, bài vở, giấc ngủ."
      }
    ],
    shadowingDrills: [
      {
        id: "d7-s1",
        text: "Tell me about it! It's been such a hectic week.",
        translationVi: "Chuẩn luôn! Tuần vừa rồi thật là bận rộn chóng mặt.",
        intonationTip: "Nhấn mạnh cảm xúc vào 'Tell me about it' và 'hectic'.",
        linkingTip: "Nối âm: Tell_me, such_a.",
        speakerRole: "Learner (Model Tone)"
      },
      {
        id: "d7-s2",
        text: "I'm just going to keep it low-key and catch up on some reading.",
        translationVi: "Tôi chỉ định nghỉ ngơi nhẹ nhàng và đọc bù mấy cuốn sách.",
        intonationTip: "Hạ giọng thư thả ở cuối câu ↘.",
        linkingTip: "Nối âm: keep_it, catch_up_on.",
        speakerRole: "Learner (Model Tone)"
      },
      {
        id: "d7-s3",
        text: "Sounds like a solid plan. Have a relaxing weekend ahead!",
        translationVi: "Nghe có vẻ là kế hoạch lý tưởng đấy. Chúc bạn cuối tuần thật thư giãn nhé!",
        intonationTip: "Tươi tắn, ấm áp.",
        linkingTip: "Nối âm: Sounds_like, weekend_ahead.",
        speakerRole: "David (Colleague)"
      }
    ],
    bedtimeReflex: {
      scenarioVi: "Ai đó hỏi bạn trước khi ra về: 'Any big plans for Sunday?'",
      challengePromptEn: "Answer that you'll keep it low-key and catch up on sleep.",
      sampleReflexA2: "Not much, I will stay home and sleep more.",
      sampleReflexB1: "Nothing too crazy, just keeping it low-key and catching up on some much-needed sleep!",
      pedagogicalKey: "Sử dụng 'much-needed sleep' để nâng tầm phản xạ B1."
    }
  },
  // We can include comprehensive summaries for Days 8-30
  {
    day: 8,
    month: 1,
    titleEn: "Public Transport & Navigating Metro Systems",
    titleVi: "Phương tiện công cộng & Đi tàu điện ngầm thành thạo",
    theme: "Transit & Commuting",
    cefrFocus: "A2 → B1",
    scenarioDescription: "Bạn đang mua thẻ xe buýt/metro tại máy bán vé và cần đổi tiền lẻ hoặc hỏi nhân viên nhà ga.",
    aiPersonaRole: "Station Attendant at Tokyo Subway",
    userRole: "Commuter figuring out ticket transfers and fare gates",
    roleplayGoal: "Hỏi chuyển tuyến (transfer), nạp tiền thẻ và xử lý khi cửa soát vé báo lỗi.",
    initialAiGreeting: {
      en: "Can I help you with the ticket machine? It can be tricky for first-time visitors.",
      vi: "Tôi có thể giúp bạn với máy bán vé không? Lần đầu dùng có thể hơi phức tạp đấy.",
      suggestedA2: "Yes, please! I want to go to Shibuya station.",
      suggestedB1: "Thanks so much! I'm trying to top up my transit card and figure out which line transfers to Shibuya."
    },
    chunks: [
      { phrase: "top up my transit card", meaningVi: "Nạp thêm tiền vào thẻ đi tàu", example: "Where can I top up my card?", exampleVi: "Tôi có thể nạp tiền thẻ ở đâu?" },
      { phrase: "transfer to Line 2", meaningVi: "Đổi sang tuyến tàu số 2", example: "You need to transfer at the next station.", exampleVi: "Bạn cần đổi tàu ở ga kế tiếp." },
      { phrase: "during rush hour", meaningVi: "Vào giờ cao điểm", example: "Trains get super packed during rush hour.", exampleVi: "Tàu rất đông vào giờ cao điểm." }
    ],
    shadowingDrills: [
      { id: "d8-s1", text: "Do I need to transfer, or is it a direct train to Shibuya?", translationVi: "Tôi có cần đổi tàu không, hay là tàu chạy thẳng đến Shibuya?", intonationTip: "Lên giọng ở transfer, hạ ở direct train.", speakerRole: "Learner" }
    ],
    bedtimeReflex: {
      scenarioVi: "Nhân viên ga hỏi: 'Do you need a single ride ticket or an all-day pass?'",
      challengePromptEn: "Choose all-day pass as you will travel a lot today.",
      sampleReflexA2: "An all-day pass, please.",
      sampleReflexB1: "I'll go with the all-day pass, since I'll be hopping around town all day!",
      pedagogicalKey: "'hop around town' - phản xạ B1 rất tự nhiên."
    }
  },
  {
    day: 9,
    month: 1,
    titleEn: "Checking into a Hotel & Requesting Amenities",
    titleVi: "Nhận phòng khách sạn & Yêu cầu tiện nghi phòng",
    theme: "Hospitality & Accommodation",
    cefrFocus: "A2 → B1",
    scenarioDescription: "Bạn đến nhận phòng khách sạn tại Singapore sau chuyến bay dài và muốn xin phòng tầng cao yên tĩnh.",
    aiPersonaRole: "Front Desk Receptionist",
    userRole: "Tired guest checking in and requesting late check-out",
    roleplayGoal: "Check-in thành thạo, hỏi mật khẩu Wi-Fi, giờ ăn sáng và khả năng trả phòng muộn (late checkout).",
    initialAiGreeting: {
      en: "Welcome to Marina Bay Grand! May I have your name and passport for the reservation?",
      vi: "Chào mừng quý khách đến Marina Bay Grand! Cho tôi xin tên và hộ chiếu đặt phòng được không ạ?",
      suggestedA2: "Here is my passport. My reservation is under Nam Nguyen.",
      suggestedB1: "Good afternoon! The reservation is under Nam Nguyen. Here is my passport and booking confirmation."
    },
    chunks: [
      { phrase: "under the name of...", meaningVi: "Đặt phòng dưới tên của...", example: "The booking is under my name.", exampleVi: "Đặt phòng dưới tên của tôi." },
      { phrase: "complimentary breakfast", meaningVi: "Bữa sáng miễn phí đi kèm", example: "Is breakfast complimentary?", exampleVi: "Bữa sáng có miễn phí không?" },
      { phrase: "request a late check-out", meaningVi: "Yêu cầu trả phòng muộn hơn", example: "Could we request a late check-out?", exampleVi: "Chúng tôi có thể xin trả phòng muộn được không?" }
    ],
    shadowingDrills: [
      { id: "d9-s1", text: "Would it be possible to get a quiet room on a higher floor?", translationVi: "Liệu có thể sắp xếp cho tôi phòng yên tĩnh ở tầng cao được không?", intonationTip: "Ngữ điệu lịch sự nhẹ nhàng.", speakerRole: "Learner" }
    ],
    bedtimeReflex: {
      scenarioVi: "Lễ tân hỏi: 'Would you prefer a king bed or twin beds?'",
      challengePromptEn: "State your preference with a polite justification.",
      sampleReflexA2: "A king bed, please.",
      sampleReflexB1: "A king bed would be ideal, thanks so much!",
      pedagogicalKey: "Dùng 'would be ideal' thanh lịch."
    }
  },
  {
    day: 10,
    month: 1,
    titleEn: "Expressing Likes, Dislikes & Nuanced Opinions",
    titleVi: "Diễn tả yêu, ghét & Góc nhìn đa chiều tinh tế",
    theme: "Taste & Preferences",
    cefrFocus: "A2 → B1",
    scenarioDescription: "Bạn đang trò chuyện về phim ảnh và thể loại âm nhạc với một người bạn nước ngoài.",
    aiPersonaRole: "Film enthusiast friend",
    userRole: "Friend discussing cinema preferences beyond simple 'good' or 'bad'",
    roleplayGoal: "Dùng từ vựng thay thế cho 'I don't like' (e.g. 'not my cup of tea', 'not really a fan of').",
    initialAiGreeting: {
      en: "Have you seen the new sci-fi movie everyone is raving about? What did you think?",
      vi: "Bạn đã xem bộ phim khoa học viễn tưởng mới mà ai cũng khen nức nở chưa? Bạn thấy thế nào?",
      suggestedA2: "I watched it, but I didn't like it very much.",
      suggestedB1: "I did catch it last weekend! To be honest, it wasn't really my cup of tea."
    },
    chunks: [
      { phrase: "not really my cup of tea", meaningVi: "Không hẳn là sở thích hay gu của tôi", example: "Horror films are not really my cup of tea.", exampleVi: "Phim kinh dị không hẳn là gu của mình." },
      { phrase: "rave about something", meaningVi: "Khen ngợi nức nở điều gì", example: "Critics are raving about the plot.", exampleVi: "Giới phê bình khen nức nở cốt truyện." },
      { phrase: "it grew on me", meaningVi: "Lúc đầu không thích lắm nhưng càng về sau càng thích", example: "The song took time, but it really grew on me.", exampleVi: "Bài hát cần thời gian ngấm, nhưng giờ mình rất thích." }
    ],
    shadowingDrills: [
      { id: "d10-s1", text: "To be fair, the visuals were stunning, but the plot fell flat.", translationVi: "Công bằng mà nói hình ảnh tuyệt đẹp, nhưng cốt truyện thì hơi nhạt nhẽo.", intonationTip: "Tương phản giữa 'stunning' và 'fell flat'.", speakerRole: "Learner" }
    ],
    bedtimeReflex: {
      scenarioVi: "Ai đó rủ bạn đi nghe nhạc rock ồn ào mà bạn không thích.",
      challengePromptEn: "Politely decline using 'not really my thing/cup of tea'.",
      sampleReflexA2: "No thanks, I don't like rock music.",
      sampleReflexB1: "Thanks for inviting me, but heavy rock isn't really my cup of tea!",
      pedagogicalKey: "Từ chối khéo léo không gây mất lòng."
    }
  },

  // ================= MONTH 2: DAYS 31 - 60 (Mở rộng kết nối & Xử lý tình huống công sở/du lịch) =================
  {
    day: 31,
    month: 2,
    titleEn: "Starting a Professional Video Call & Casual Icebreaker",
    titleVi: "Mở đầu cuộc họp trực tuyến & Phá vỡ khoảng cách công sở",
    theme: "Remote Work & Professional Polish",
    cefrFocus: "B1",
    scenarioDescription: "Bạn vừa đăng nhập vào cuộc họp Zoom với đối tác quốc tế trước khi sếp vào phòng họp.",
    aiPersonaRole: "Sarah - Account Director based in New York",
    userRole: "Project Coordinator connecting 5 minutes early",
    roleplayGoal: "Chào hỏi công sở tự nhiên, xử lý sự cố mic/camera nhẹ nhàng và chuyển vào chủ đề họp.",
    initialAiGreeting: {
      en: "Morning team! Can everyone hear and see me loud and clear?",
      vi: "Chào buổi sáng cả nhóm! Mọi người có nghe rõ và nhìn rõ hình của tôi không?",
      suggestedA2: "Yes, I can hear you clearly! Good morning.",
      suggestedB1: "Loud and clear, Sarah! Good morning, how are things over in New York today?"
    },
    chunks: [
      { phrase: "loud and clear", meaningVi: "Nghe rất to và rõ ràng", example: "You're coming through loud and clear.", exampleVi: "Giọng bạn nghe rất to và rõ." },
      { phrase: "you're on mute", meaningVi: "Bạn đang tắt mic kìa", example: "Hey Sarah, I think you're on mute!", exampleVi: "Sarah ơi, hình như bạn đang tắt mic rồi!" },
      { phrase: "dive right into the agenda", meaningVi: "Bắt tay ngay vào nội dung cuộc họp", example: "Shall we dive right into today's agenda?", exampleVi: "Chúng ta bắt đầu ngay vào nội dung họp hôm nay nhé?" }
    ],
    shadowingDrills: [
      { id: "d31-s1", text: "You were cutting out for a second there, but you're back now.", translationVi: "Vừa nãy tiếng của bạn bị giật mất một giây, nhưng giờ nghe rõ lại rồi.", intonationTip: "Nhấn mạnh 'cutting out' và 'back now'.", speakerRole: "Learner" }
    ],
    bedtimeReflex: {
      scenarioVi: "Trong họp online, mạng của bạn bị chập chờn.",
      challengePromptEn: "Apologize and inform them your connection lagged for a second.",
      sampleReflexA2: "Sorry, my internet was bad.",
      sampleReflexB1: "My apologies! My connection lagged for a quick second, but I'm all set now.",
      pedagogicalKey: "Tự tin xử lý tình huống công nghệ trong công việc."
    }
  },
  {
    day: 45,
    month: 2,
    titleEn: "Handling Delays & Constructive Problem Solving",
    titleVi: "Xử lý chậm trễ tiến độ & Đàm phán giải pháp xây dựng",
    theme: "Workplace Accountability & Solutions",
    cefrFocus: "B1",
    scenarioDescription: "Dự án của bạn gặp trục trặc kỹ thuật và có nguy cơ trễ hạn bàn giao 2 ngày. Bạn cần báo cho quản lý.",
    aiPersonaRole: "Marcus - Pragmatic Engineering Manager",
    userRole: "Team member presenting the delay along with an actionable recovery plan",
    roleplayGoal: "Trình bày vấn đề không đổ lỗi, đưa ra giải pháp thay thế và xin gia hạn thời hạn hợp lý.",
    initialAiGreeting: {
      en: "Hey! I saw your message about the sprint delivery. What's the latest update on the roadblock?",
      vi: "Chào bạn! Tôi vừa thấy tin nhắn về việc bàn giao sprint. Cập nhật mới nhất về khúc mắc là gì thế?",
      suggestedA2: "We have a big bug, so we need two more days to finish.",
      suggestedB1: "We ran into an unexpected edge case. To make sure quality isn't compromised, we'll need an extra 48 hours."
    },
    chunks: [
      { phrase: "run into an unexpected hiccup", meaningVi: "Gặp phải một sự cố nhỏ ngoài dự kiến", example: "We ran into a slight hiccup with testing.", exampleVi: "Chúng tôi gặp một trục trặc nhỏ trong khâu kiểm thử." },
      { phrase: "touch base on this", meaningVi: "Trao đổi nhanh / cập nhật với nhau về việc này", example: "Let's touch base tomorrow morning.", exampleVi: "Sáng mai chúng ta trao đổi nhanh lại nhé." },
      { phrase: "push back the deadline", meaningVi: "Lùi thời hạn bàn giao lại", example: "Would it be feasible to push back the deadline slightly?", exampleVi: "Liệu có khả thi để lùi hạn chót lại một chút không?" }
    ],
    shadowingDrills: [
      { id: "d45-s1", text: "We're actively working on a patch and should be back on track by Friday.", translationVi: "Chúng tôi đang tích cực vá lỗi và sẽ bắt kịp tiến độ trước thứ Sáu.", intonationTip: "Tự tin và có trách nhiệm.", speakerRole: "Learner" }
    ],
    bedtimeReflex: {
      scenarioVi: "Quản lý hỏi: 'Can you guarantee the delivery by Monday morning?'",
      challengePromptEn: "Confirm with confidence and promise a progress update.",
      sampleReflexA2: "Yes, I will finish it by Monday morning.",
      sampleReflexB1: "Absolutely. I'll personally monitor it and give you an update before end-of-day Sunday.",
      pedagogicalKey: "Giao tiếp công sở chuẩn B1 thể hiện sự cam kết cao."
    }
  },

  // ================= MONTH 3: DAYS 61 - 90 (Giao tiếp phản xạ & Tự tin hội thoại chuyên sâu) =================
  {
    day: 61,
    month: 3,
    titleEn: "Spontaneous Storytelling & Vivid Narrative Arc",
    titleVi: "Kể chuyện quá khứ lôi cuốn & Tạo cao trào tự nhiên",
    theme: "Masterful Storytelling & Personal Anecdotes",
    cefrFocus: "B1 → B1+",
    scenarioDescription: "Bạn đang ngồi ăn tối với nhóm bạn quốc tế và kể lại một kỷ niệm dở khóc dở cười trong chuyến du lịch gần nhất.",
    aiPersonaRole: "Chloe - Engaged dinner companion",
    userRole: "Engaging storyteller sharing an unexpected travel adventure",
    roleplayGoal: "Dùng thì quá khứ linh hoạt (past continuous, past perfect), từ nối cảm xúc ('out of nowhere', 'to make matters worse').",
    initialAiGreeting: {
      en: "Someone told me you had the craziest adventure when you backpacked through Southeast Asia! What actually happened?",
      vi: "Có người kể với mình bạn đã có một chuyến phiêu lưu cười ra nước mắt khi đi phượt Đông Nam Á! Chuyện thực sự là thế nào vậy?",
      suggestedA2: "Yes, it was crazy! I lost my passport on the bus, but I found it later.",
      suggestedB1: "Oh man, where do I even begin? So, picture this: it was midnight, pouring rain, and out of nowhere, our bus broke down!"
    },
    chunks: [
      { phrase: "where do I even begin?", meaningVi: "Biết bắt đầu từ đâu bây giờ nhỉ? (Mở đầu cực kỳ lôi cuốn)", example: "Where do I even begin? It was a wild ride!", exampleVi: "Biết bắt đầu từ đâu đây? Một trải nghiệm quá cuồng nhiệt!" },
      { phrase: "out of nowhere", meaningVi: "Bỗng nhiên / Bất thình lình", example: "Out of nowhere, the lights went out.", exampleVi: "Bỗng nhiên đèn phụt tắt." },
      { phrase: "long story short", meaningVi: "Tóm lại là / Nói ngắn gọn thì", example: "Long story short, we made it just in time.", exampleVi: "Tóm lại là chúng tôi đến vừa kịp lúc." },
      { phrase: "to make matters worse", meaningVi: "Tệ hơn nữa là...", example: "To make matters worse, my phone died.", exampleVi: "Tệ hơn nữa là điện thoại tôi lại hết pin." }
    ],
    shadowingDrills: [
      { id: "d61-s1", text: "Long story short, what started as a disaster turned into the best memory of the trip!", translationVi: "Tóm lại là, thứ bắt đầu như một thảm họa lại trở thành kỷ niệm đẹp nhất của chuyến đi!", intonationTip: "Cao trào vui vẻ ở 'best memory'.", speakerRole: "Learner" }
    ],
    bedtimeReflex: {
      scenarioVi: "Một người bạn hỏi: 'How did that crazy interview end up?'",
      challengePromptEn: "Wrap it up dynamically using 'Long story short'.",
      sampleReflexA2: "Long story short, they gave me the job!",
      sampleReflexB1: "Long story short, despite all the technical glitches, they ended up making me an offer on the spot!",
      pedagogicalKey: "Phản xạ kết bài ngắn gọn, hấp dẫn."
    }
  },
  {
    day: 75,
    month: 3,
    titleEn: "Constructive Debate & Tactful Disagreement",
    titleVi: "Tranh biện xây dựng & Bất đồng quan điểm lịch thiệp",
    theme: "Critical Thinking & Nuanced Persuasion",
    cefrFocus: "B1 → B1+",
    scenarioDescription: "Trong buổi thảo luận nhóm, đối tác đề xuất làm việc 100% tại văn phòng. Bạn phản biện bảo vệ mô hình kết hợp (Hybrid work).",
    aiPersonaRole: "Arthur - Traditional business strategist",
    userRole: "Advocate for modern flexible work culture presenting balanced arguments",
    roleplayGoal: "Bất đồng mà không đối đầu gay gắt, dùng cụm 'I see where you're coming from, but...', 'Look at it from another angle'.",
    initialAiGreeting: {
      en: "I genuinely believe everyone needs to be in the office five days a week for real collaboration. Remote work just dilutes company culture.",
      vi: "Tôi thực lòng tin rằng mọi người cần lên văn phòng đủ 5 ngày một tuần để cộng tác thật sự. Làm việc từ xa làm loãng văn hóa công ty.",
      suggestedA2: "I disagree with you. Working from home saves a lot of time and money.",
      suggestedB1: "I definitely see your point regarding spontaneous teamwork, but on the flip side, hybrid work drastically boosts focused productivity."
    },
    chunks: [
      { phrase: "I see where you're coming from, but...", meaningVi: "Tôi hiểu góc nhìn của bạn, tuy nhiên...", example: "I see where you're coming from, but we should consider the cost.", exampleVi: "Tôi hiểu góc nhìn của bạn, nhưng chúng ta nên tính đến chi phí." },
      { phrase: "on the flip side", meaningVi: "Ở chiều ngược lại / Mặt khác", example: "On the flip side, flexibility attracts top talent.", exampleVi: "Mặt khác, sự linh hoạt lại thu hút nhân tài hàng đầu." },
      { phrase: "find common ground", meaningVi: "Tìm thấy tiếng nói chung", example: "I'm sure we can find some common ground here.", exampleVi: "Tôi tin chúng ta có thể tìm được tiếng nói chung ở đây." }
    ],
    shadowingDrills: [
      { id: "d75-s1", text: "I respect that perspective, but if we look at the data, the hybrid model delivers the best of both worlds.", translationVi: "Tôi tôn trọng quan điểm đó, nhưng nếu nhìn vào dữ liệu, mô hình kết hợp mang lại lợi ích tốt nhất từ cả hai phía.", intonationTip: "Điềm tĩnh, thuyết phục, dứt khoát.", speakerRole: "Learner" }
    ],
    bedtimeReflex: {
      scenarioVi: "Đồng nghiệp khăng khăng: 'AI will replace all human jobs in two years!'",
      challengePromptEn: "Respond with tactful disagreement using 'I see where you're coming from, but...'",
      sampleReflexA2: "I don't think so. Humans are still needed.",
      sampleReflexB1: "I see where you're coming from given how fast tech is moving, but AI is far more likely to augment human creativity than replace it entirely.",
      pedagogicalKey: "Năng lực B1+ tranh biện bằng tư duy logic và ngôn ngữ điềm đạm."
    }
  },
  {
    day: 90,
    month: 3,
    titleEn: "The 90-Day Graduation: Effortless Spontaneous Fluency",
    titleVi: "Lễ Tốt Nghiệp 90 Ngày: Giao tiếp Phản xạ Đỉnh cao Không Rào cản",
    theme: "Capstone Reflex Mastery & Future Horizons",
    cefrFocus: "B1 → B1+",
    scenarioDescription: "Buổi phỏng vấn và trò chuyện thân mật tổng kết hành trình 90 ngày cùng Giáo sư Trí tuệ Nhân tạo. Bạn nhìn lại sự lột xác của bản thân từ A2 lên B1+ trôi chảy.",
    aiPersonaRole: "Professor Henderson - Honorary SLA Chair & Mentor",
    userRole: "Confident B1+ English Speaker celebrating true communicative breakthrough",
    roleplayGoal: "Thảo luận tự nhiên mọi chủ đề, chia sẻ tầm nhìn tương lai, tự tin giao tiếp quốc tế không còn chút e ngại dịch nhẩm.",
    initialAiGreeting: {
      en: "Congratulations on reaching Day 90! Looking back from Day 1 to right now, how has your confidence and speaking reflex transformed?",
      vi: "Chúc mừng bạn đã cán đích Ngày 90! Nhìn lại từ Ngày 1 đến khoảnh khắc này, sự tự tin và phản xạ nói của bạn đã chuyển hóa kỳ diệu thế nào?",
      suggestedA2: "I feel so proud! Now I can speak English without fear and talk with anyone.",
      suggestedB1: "Honestly, it has been an absolute game changer! I no longer translate in my head, and speaking English has truly become second nature to me."
    },
    chunks: [
      { phrase: "an absolute game changer", meaningVi: "Một bước ngoặt thay đổi hoàn toàn cuộc chơi", example: "This daily 60-minute routine was a game changer for me.", exampleVi: "Thói quen 60 phút mỗi ngày này là bước ngoặt hoàn toàn đối với tôi." },
      { phrase: "become second nature", meaningVi: "Trở thành phản xạ tự nhiên như hơi thở", example: "Speaking up in English has become second nature.", exampleVi: "Cất tiếng nói tiếng Anh đã trở thành phản xạ tự nhiên của tôi." },
      { phrase: "come a long way", meaningVi: "Đã tiến bộ một chặng đường rất dài", example: "You've definitely come a long way since day one!", exampleVi: "Bạn chắc chắn đã tiến bộ một chặng đường rất dài từ ngày đầu tiên!" },
      { phrase: "the sky is the limit", meaningVi: "Không còn giới hạn nào nữa / Tương lai rộng mở vô tận", example: "With this fluency, the sky is the limit for your career.", exampleVi: "Với sự trôi chảy này, sự nghiệp của bạn sẽ không còn giới hạn nào nữa." }
    ],
    shadowingDrills: [
      { id: "d90-s1", text: "Consistency was tough at times, but speaking English has genuinely become second nature to me.", translationVi: "Duy trì đều đặn đôi khi không dễ, nhưng cất tiếng nói tiếng Anh giờ đây thực sự đã là bản năng tự nhiên của tôi.", intonationTip: "Tự hào, trầm ấm, truyền cảm hứng.", speakerRole: "Learner" }
    ],
    bedtimeReflex: {
      scenarioVi: "Giáo sư hỏi bạn một câu cuối cùng: 'What is your golden advice for someone starting at Day 1?'",
      challengePromptEn: "Share your golden rule about fluency over accuracy and daily consistency.",
      sampleReflexA2: "Practice every day and don't be afraid to make mistakes!",
      sampleReflexB1: "Don't obsess over minor grammar mistakes; prioritize fluency, speak out loud daily, and trust the SLA process!",
      pedagogicalKey: "Bậc thầy phản xạ giao tiếp đã hoàn thành trọn vẹn lộ trình 90 ngày."
    }
  }
];

// Helper to get or generate full 90-day lessons dynamically
export function getLessonForDay(dayNumber: number): DayLesson {
  const existing = CURRICULUM_DATA.find((l) => l.day === dayNumber);
  if (existing) return existing;

  // Dynamically scaffold lessons for all other days between 1 and 90 following the SLA syllabus
  const month: 1 | 2 | 3 = dayNumber <= 30 ? 1 : dayNumber <= 60 ? 2 : 3;
  const cefr: 'A2 → B1' | 'B1' | 'B1 → B1+' =
    month === 1 ? 'A2 → B1' : month === 2 ? 'B1' : 'B1 → B1+';

  const month1Topics = [
    { en: "Weekend Getaways & Nature Walks", vi: "Chuyến dã ngoại cuối tuần & Đi dạo ngắm thiên nhiên" },
    { en: "Booking a Doctor's Appointment & Explaining Symptoms", vi: "Hẹn khám bác sĩ & Mô tả triệu chứng cơ thể" },
    { en: "Shopping for Clothes & Asking for Sizes", vi: "Mua sắm quần áo & Hỏi cỡ số vừa vặn" },
    { en: "At the Gym & Workout Advice", vi: "Tập luyện thể thao & Lời khuyên thể hình" },
    { en: "Cooking a Meal & Following Recipes", vi: "Nấu nướng bữa ăn & Hướng dẫn công thức" },
    { en: "Talking About Hobbies & Crafts", vi: "Nói về thú vui tao nhã & Đồ thủ công" },
    { en: "Bank & Currency Exchange Transactions", vi: "Giao dịch ngân hàng & Đổi ngoại tệ" },
    { en: "Airport Check-In & Luggage Rules", vi: "Làm thủ tục sân bay & Quy định hành lý" },
    { en: "Calling Customer Service & Inquiring Bills", vi: "Gọi tổng đài chăm sóc khách hàng & Tra cứu hóa đơn" },
    { en: "Returning an Item & Asking for a Refund", vi: "Đổi trả hàng hóa & Yêu cầu hoàn tiền khéo léo" },
    { en: "Pet Care & Veterinary Checkup", vi: "Chăm sóc thú cưng & Đưa cún miu đi khám" },
    { en: "At the Library or Bookstore", vi: "Tìm sách tại thư viện & Hiệu sách quen" },
    { en: "Neighborly Chat & Community Life", vi: "Trò chuyện thân tình với hàng xóm láng giềng" },
    { en: "Weather Forecast & Planning Outdoor Events", vi: "Dự báo thời tiết & Lên kế hoạch ngoài trời" },
    { en: "Celebrating Birthdays & Toasting Friends", vi: "Tiệc sinh nhật & Nâng ly chúc mừng bạn bè" },
    { en: "Public Parks & Leisure Sports", vi: "Công viên dạo bộ & Thể thao giải trí" },
    { en: "Family Traditions & Festive Holidays", vi: "Truyền thống gia đình & Ngày lễ hội ấm áp" },
    { en: "Renting a Bike or Car", vi: "Thuê xe đạp hoặc ô tô tự lái" },
    { en: "Museum Visits & Appreciating Art", vi: "Thăm bảo tàng nghệ thuật & Bình luận tranh ảnh" },
    { en: "Month 1 Milestone Check & Fluid Conversations", vi: "Cột mốc Tháng 1 & Hội thoại phản xạ không ngắt quãng" }
  ];

  const month2Topics = [
    { en: "Pitching an Idea to Your Teammates", vi: "Trình bày ý tưởng mới trước đồng đội" },
    { en: "Negotiating Deadlines with Stakeholders", vi: "Thương lượng thời hạn bàn giao với đối tác" },
    { en: "Giving Constructive Feedback to a Peer", vi: "Đóng góp ý kiến xây dựng cho bạn đồng nghiệp" },
    { en: "Receiving Critique Without Becoming Defensive", vi: "Đón nhận lời nhận xét mà không tự ái" },
    { en: "Networking at an Industry Conference", vi: "Kết nối mạng lưới tại hội nghị chuyên ngành" },
    { en: "Organizing an Office Social Event", vi: "Tổ chức tiệc gắn kết tinh thần công ty" },
    { en: "Business Travel Itinerary & Car Rentals", vi: "Lịch trình công tác & Thuê xe doanh nghiệp" },
    { en: "Job Interview: Strengths & Weaknesses", vi: "Phỏng vấn việc làm: Điểm mạnh & Điểm cần cải thiện" },
    { en: "Handling Client Complaints with Tact", vi: "Xử lý phàn nàn của khách hàng với sự thấu cảm" },
    { en: "Brainstorming Product Improvements", vi: "Thảo luận sáng tạo cải tiến sản phẩm" },
    { en: "Expressing Concerns in a Team Standup", vi: "Nêu quan ngại một cách văn minh trong buổi họp nhanh" },
    { en: "Explaining Technical Glitches to Non-Tech Clients", vi: "Giải thích lỗi kỹ thuật cho khách hàng dễ hiểu" },
    { en: "Discussing Salary & Career Growth Path", vi: "Trao đổi lộ trình thăng tiến & Chế độ đãi ngộ" },
    { en: "Cross-Cultural Communication at Work", vi: "Giao tiếp liên văn hóa nơi công sở đa quốc gia" },
    { en: "Month 2 Milestone: Workplace Agility Review", vi: "Cột mốc Tháng 2: Đánh giá sự nhạy bén công sở" }
  ];

  const month3Topics = [
    { en: "Sharing Memorable Childhood Anecdotes", vi: "Kể lại những mẩu chuyện tuổi thơ đáng nhớ" },
    { en: "Discussing Global Trends & Future AI Impact", vi: "Thảo luận xu hướng toàn cầu & Tác động của AI" },
    { en: "Tactful Negotiation & Win-Win Solutions", vi: "Đàm phán khéo léo & Đôi bên cùng có lợi" },
    { en: "Expressing Empathy & Deep Emotional Support", vi: "Bày tỏ sự đồng cảm & Điểm tựa tinh thần sâu sắc" },
    { en: "Handling Difficult Questions on the Spot", vi: "Xử lý câu hỏi hóc búa ứng khẩu tức thì" },
    { en: "Presenting Data & Inspiring With Charts", vi: "Thuyết trình số liệu & Truyền cảm hứng từ biểu đồ" },
    { en: "Debating Work-Life Balance vs Hustle Culture", vi: "Tranh biện lối sống cân bằng và văn hóa cống hiến" },
    { en: "Humor, Irony & Sarcasm in English", vi: "Sử dụng sự hài hước, châm biếm nhẹ nhàng tự nhiên" },
    { en: "Mastering Metaphors & Idiomatic Wit", vi: "Làm chủ ẩn dụ & Lối chơi chữ thông minh" },
    { en: "Global Citizenship & Cultural Perspectives", vi: "Tư duy công dân toàn cầu & Đa dạng văn hóa" },
    { en: "Elevator Pitch: Your 60-Second Life Vision", vi: "Bản giới thiệu thang máy 60 giây về tầm nhìn cuộc đời" },
    { en: "The Power of Active Listening in High-Stakes Talks", vi: "Sức mạnh lắng nghe chủ động trong hội đàm quan trọng" }
  ];

  let topic = { en: `Day ${dayNumber} SLA Immersion`, vi: `Ngày ${dayNumber}: Luyện phản xạ chuyên sâu` };
  if (month === 1) {
    topic = month1Topics[(dayNumber - 11) % month1Topics.length] || topic;
  } else if (month === 2) {
    topic = month2Topics[(dayNumber - 32) % month2Topics.length] || topic;
  } else {
    topic = month3Topics[(dayNumber - 62) % month3Topics.length] || topic;
  }

  return {
    day: dayNumber,
    month,
    titleEn: topic.en,
    titleVi: topic.vi,
    theme: `Reflex Level: ${cefr} - Communication Dynamics`,
    cefrFocus: cefr,
    scenarioDescription: `Tình huống tương tác thực tế ngày ${dayNumber}: Bạn đang thảo luận về ${topic.vi.toLowerCase()} cùng đối tác nước ngoài.`,
    aiPersonaRole: `SLA Conversational Coach for Day ${dayNumber}`,
    userRole: `Active Learner mastering Day ${dayNumber} reflex`,
    roleplayGoal: `Thực hành đối thoại tự nhiên, vận dụng ít nhất 2 cụm collocations và trả lời trong vòng 3-5 giây.`,
    initialAiGreeting: {
      en: `Welcome to Day ${dayNumber}! Today we're exploring: "${topic.en}". How have you been feeling about your speaking progress so far?`,
      vi: `Chào mừng bạn đến với Ngày ${dayNumber}! Hôm nay chúng ta sẽ cùng khám phá: "${topic.vi}". Bạn cảm thấy phản xạ nói của mình thế nào rồi?`,
      suggestedA2: `I feel much better now. I am ready to practice today's topic!`,
      suggestedB1: `I've definitely noticed a boost in my confidence, and I'm eager to tackle today's scenario!`
    },
    chunks: [
      {
        phrase: "make steady progress",
        meaningVi: "Tiến bộ vững chắc, đều đặn",
        example: "I'm making steady progress day by day.",
        exampleVi: "Tôi đang tiến bộ vững chắc từng ngày."
      },
      {
        phrase: "get the hang of it",
        meaningVi: "Dần quen tay / nắm được bí quyết",
        example: "Don't worry, you'll get the hang of it soon.",
        exampleVi: "Đừng lo, bạn sẽ sớm quen và làm chủ nó thôi."
      },
      {
        phrase: "in the long run",
        meaningVi: "Về lâu về dài",
        example: "Consistency pays off in the long run.",
        exampleVi: "Sự kiên trì sẽ mang lại quả ngọt về lâu về dài."
      }
    ],
    shadowingDrills: [
      {
        id: `d${dayNumber}-s1`,
        text: `Consistency pays off in the long run if you stay focused.`,
        translationVi: `Sự kiên trì sẽ đem lại thành quả về lâu về dài nếu bạn giữ vững sự tập trung.`,
        intonationTip: `Nhấn mạnh vào 'pays off' và 'long run'.`,
        speakerRole: `SLA Professor`
      }
    ],
    bedtimeReflex: {
      scenarioVi: `Người đối diện hỏi bạn: 'What's the key takeaway from your lesson today?'`,
      challengePromptEn: `Answer using 'get the hang of it' or 'steady progress'.`,
      sampleReflexA2: `I am making steady progress every day.`,
      sampleReflexB1: `I feel like I'm finally getting the hang of natural English rhythm!`,
      pedagogicalKey: `Duy trì phản xạ tích cực mỗi ngày.`
    }
  };
}
