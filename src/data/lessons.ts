export interface ImageMarker {
  id: string;
  x: number;
  y: number;
  labelX?: number;
  labelY?: number;
}

export interface LessonSection {
  title: string;
  paragraphs: string[];
  imageUrl?: string;
  imageAlt?: string;
  imageMarkers?: ImageMarker[];
  gifUrl?: string;
  gifAlt?: string;
  legend?: { label: string; description: string }[];
}

export interface Lesson {
  id: string;
  chapter: string;
  title: string;
  titleVi: string;
  description: string;
  content: LessonSection[];
  quiz: QuizQuestion[];
  xp: number;
  icon?: string;
}

export interface QuizQuestion {
  type?: "multiple-choice" | "fill-in-blank";
  question: string;
  options?: string[];
  correctAnswer?: number;
  correctAnswerText?: string;
  explanation: string;
}

export const LESSONS: Lesson[] = [
  // Chương 6: Động cơ đốt trong
  {
    id: "ice-overview",
    chapter: "Chương 6: Động cơ đốt trong",
    title: "Overview of Internal Combustion Engine",
    titleVi: "Đại cương về động cơ đốt trong",
    description: "Khái niệm, phân loại và cấu tạo chung của động cơ đốt trong.",
    xp: 50,
    icon: "BookOpen",
    content: [
      {
        title: "Khái niệm chung",
        paragraphs: [
          "Động cơ đốt trong 4 kỳ (nạp, nén, nổ, xả) hoạt động dựa trên 4 hành trình của piston tương ứng 2 vòng quay trục khuỷu, biến nhiệt năng thành cơ năng.",
          "Quy trình bao gồm: Nạp hòa khí/không khí -> Nén áp suất cao -> Đốt cháy/sinh công -> Xả khí thải. Đây là nguyên lý cơ bản của động cơ xăng và diesel.",
        ],
      },
      {
        title: "Khái niệm cơ bản",
        paragraphs: [
          "4 kỳ: Nạp - Nén - Nổ (Sinh công) - Xả.",
          "Chu kỳ làm việc: Piston thực hiện 4 hành trình, trục khuỷu quay 2 vòng (720 độ) để hoàn thành một chu trình.",
          "Điểm chết: Điểm chết trên (ĐCT) - Piston xa trục khuỷu nhất; Điểm chết dưới (ĐCD) - Piston gần trục khuỷu nhất.",
        ],
      },
      {
        title: "Cấu tạo tổng quát",
        paragraphs: [
          "Cấu tạo chính của động cơ bao gồm: Piston, xi lanh, thanh truyền, trục khuỷu, xupap nạp/xả, bugi (đối với động cơ xăng) hoặc vòi phun (đối với động cơ diesel).",
        ],
        imageUrl: "diagram:engine-structure",
        imageAlt: "Cấu tạo động cơ đốt trong",
        imageMarkers: [
          { id: "1", x: 50, y: 18.75, labelX: 50, labelY: 35 },
          { id: "2", x: 50, y: 8.75, labelX: 85, labelY: 15 },
          { id: "3", x: 50, y: 40, labelX: 85, labelY: 52.5 },
          { id: "4", x: 43.75, y: 15, labelX: 15, labelY: 26.25 },
          { id: "5", x: 56.25, y: 15, labelX: 85, labelY: 26.25 },
          { id: "6", x: 34.375, y: 12.5, labelX: 15, labelY: 15 },
          { id: "7", x: 65.625, y: 12.5, labelX: 85, labelY: 5 },
          { id: "8", x: 40, y: 43.75, labelX: 15, labelY: 45 },
          { id: "9", x: 50, y: 56.25, labelX: 15, labelY: 56.25 },
          { id: "10", x: 50, y: 77.5, labelX: 85, labelY: 67.5 },
          { id: "11", x: 37.5, y: 50, labelX: 15, labelY: 77.5 },
          { id: "12", x: 50, y: 93.75, labelX: 85, labelY: 92.5 },
          { id: "13", x: 68.75, y: 77.5, labelX: 85, labelY: 77.5 },
        ],
        legend: [
          { label: "1", description: "Nắp máy" },
          { label: "2", description: "Bugi" },
          { label: "3", description: "Pít tông" },
          { label: "4", description: "Xupap xả" },
          { label: "5", description: "Xupap nạp" },
          { label: "6", description: "Trục cam" },
          { label: "7", description: "Cò mổ" },
          { label: "8", description: "Lò xo xupap" },
          { label: "9", description: "Xilanh" },
          { label: "10", description: "Thanh truyền" },
          { label: "11", description: "Trục khuỷu" },
          { label: "12", description: "Cácte" },
          { label: "13", description: "Bánh đà" },
        ],
      },
    ],
    quiz: [
      {
        type: "multiple-choice",
        question: "Chu trình làm việc của động cơ 4 kỳ diễn ra trong mấy vòng quay trục khuỷu?",
        options: [
          "1 vòng quay.",
          "2 vòng quay.",
          "3 vòng quay.",
          "4 vòng quay."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Điểm chết trên (ĐCT) của piston được định nghĩa là vị trí:",
        options: [
          "Piston ở gần tâm trục khuỷu nhất.",
          "Piston ở xa tâm trục khuỷu nhất.",
          "Piston bắt đầu đi xuống nạp khí.",
          "Piston dừng lại để đánh lửa."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Thứ tự đúng của các kỳ trong một chu trình làm việc của động cơ 4 kỳ là:",
        options: [
          "Nạp – Nổ – Nén – Xả.",
          "Nén – Nạp – Nổ – Xả.",
          "Nạp – Nén – Nổ – Xả.",
          "Nạp – Nén – Xả – Nổ."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Trong kỳ nén của động cơ 4 kỳ, trạng thái của các xupap là:",
        options: [
          "Xupap nạp mở, xupap xả đóng.",
          "Xupap nạp đóng, xupap xả mở.",
          "Cả hai xupap đều mở để nén khí.",
          "Cả hai xupap đều đóng kín."
        ],
        correctAnswer: 3,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Động cơ Diesel nạp loại chất gì vào xi lanh trong kỳ nạp?",
        options: [
          "Hòa khí (hỗn hợp xăng và không khí).",
          "Hơi nhiên liệu Diesel.",
          "Không khí sạch.",
          "Hỗn hợp dầu Diesel và không khí."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Kỳ nào trong chu trình làm việc trực tiếp tạo ra lực đẩy piston làm quay trục khuỷu?",
        options: [
          "Kỳ nạp.",
          "Kỳ nén.",
          "Kỳ nổ (Sinh công).",
          "Kỳ xả."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Ở động cơ xăng, bugi thực hiện đánh lửa vào thời điểm nào?",
        options: [
          "Đầu kỳ nén.",
          "Giữa kỳ nén.",
          "Cuối kỳ nén (trước khi piston lên đến ĐCT).",
          "Khi piston đã xuống đến ĐCD ở kỳ nổ."
        ],
        correctAnswer: 0,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hành trình của piston (S) là:",
        options: [
          "Khoảng cách giữa hai điểm chết ĐCT và ĐCD.",
          "Quãng đường piston đi được trong 1 vòng quay trục khuỷu.",
          "Đường kính của xi lanh động cơ.",
          "Độ dài của thanh truyền."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Mối liên hệ giữa hành trình piston (S) và bán kính quay của trục khuỷu (R) là:",
        options: [
          "S = R.",
          "S = 2R.",
          "R = 2S.",
          "S = 4R."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Đặc điểm nổi bật khiến động cơ Diesel có hiệu suất nhiệt cao hơn động cơ xăng là:",
        options: [
          "Sử dụng bugi đánh lửa mạnh.",
          "Có tỷ số nén cao hơn nhiều so với động cơ xăng.",
          "Nhiên liệu Diesel rẻ tiền hơn.",
          "Cấu tạo piston phức tạp hơn."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Trong kỳ xả của động cơ 4 kỳ, piston chuyển động theo chiều nào?",
        options: [
          "Từ ĐCT xuống ĐCD.",
          "Từ ĐCD lên ĐCT.",
          "Đứng yên tại ĐCD.",
          "Quay quanh trục khuỷu."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Nhiên liệu trong động cơ Diesel tự bốc cháy là do:",
        options: [
          "Sức nóng của bugi sấy.",
          "Á suất và nhiệt độ không khí ở cuối kỳ nén rất cao.",
          "Nhiên liệu được đun nóng trước khi phun.",
          "Tia lửa điện từ vòi phun."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      }
    ],
  },
  {
    id: "ice-principles",
    chapter: "Chương 6: Động cơ đốt trong",
    title: "Working Principles of ICE",
    titleVi: "Nguyên lí làm việc của động cơ đốt trong",
    description:
      "Các khái niệm cơ bản và nguyên lí làm việc của động cơ 4 kì và 2 kì.",
    xp: 60,
    icon: "Activity",
    content: [
      {
        title: "Các khái niệm cơ bản",
        paragraphs: [
          "Điểm chết trên (ĐCT): Là vị trí của pít tông khi nó ở xa tâm trục khuỷu nhất. Tại đây, thể tích buồng cháy là nhỏ nhất.",
          "Điểm chết dưới (ĐCD): Là vị trí của pít tông khi nó ở gần tâm trục khuỷu nhất. Thể tích xi lanh lúc này là lớn nhất.",
          "Hành trình pít tông (S): Là quãng đường pít tông di chuyển giữa hai điểm chết. Thể tích công tác (Vs) là thể tích không gian giới hạn bởi ĐCT và ĐCD.",
          "Tỉ số nén (ε): Là tỉ số giữa thể tích toàn phần (khi pít tông ở ĐCD) và thể tích buồng cháy (khi pít tông ở ĐCT). Tỉ số nén càng cao, hiệu suất động cơ càng lớn.",
        ],
      },
      {
        title: "Nguyên lý hoạt động (4 giai đoạn)",
        paragraphs: [
          "Kỳ Nạp (Intake): Piston từ ĐCT xuống ĐCD. Xupap nạp mở, xupap xả đóng. Hòa khí (động cơ xăng) hoặc không khí (động cơ diesel) được hút vào xi lanh.",
          "Kỳ Nén (Compression): Piston từ ĐCD lên ĐCT. Cả 2 xupap đóng. Hòa khí/không khí bị nén, áp suất và nhiệt độ tăng cao.",
          "Kỳ Nổ/Sinh công (Power): Piston gần ĐCT. Bugi đánh lửa (xăng) hoặc nhiên liệu tự bốc cháy (diesel). Áp suất cao đẩy piston xuống ĐCD, tạo công năng.",
          "Kỳ Xả (Exhaust): Piston từ ĐCD lên ĐCT. Xupap nạp đóng, xupap xả mở. Khí thải bị đẩy ra ngoài.",
        ],
        imageUrl: "diagram:four-stroke",
        imageAlt: "Nguyên lí làm việc động cơ 4 kì",
        imageMarkers: [
          { id: "Kì 1", x: 12.5, y: 50, labelX: 12.5, labelY: 80 },
          { id: "Kì 2", x: 37.5, y: 50, labelX: 37.5, labelY: 80 },
          { id: "Kì 3", x: 62.5, y: 50, labelX: 62.5, labelY: 80 },
          { id: "Kì 4", x: 87.5, y: 50, labelX: 87.5, labelY: 80 },
        ],
        legend: [
          {
            label: "Kì 1",
            description: "Nạp (Intake) - Piston đi xuống, hút khí vào",
          },
          {
            label: "Kì 2",
            description: "Nén (Compression) - Piston đi lên, nén khí",
          },
          {
            label: "Kì 3",
            description:
              "Nổ (Power) - Bugi đánh lửa, khí cháy đẩy piston xuống",
          },
          {
            label: "Kì 4",
            description:
              "Thải (Exhaust) - Piston đi lên, đẩy khí thải ra ngoài",
          },
        ],
      },
      {
        title: "Sự khác biệt giữa Động cơ Xăng và Diesel",
        paragraphs: [
          "Động cơ Xăng: Nạp hòa khí (xăng + không khí), dùng bugi đốt cháy ở cuối kỳ nén.",
          "Động cơ Diesel: Nạp không khí, phun nhiên liệu ở cuối kỳ nén và tự bốc cháy do nhiệt độ cao.",
        ],
      },
    ],
    quiz: [
      {
        type: "multiple-choice",
        question: "Hòa khí của động cơ xăng dùng bộ chế hòa khí được hình thành ở đâu?",
        options: [
          "Bên trong buồng cháy của xi lanh.",
          "Trên đường ống nạp (trước khi vào xi lanh).",
          "Ngay tại vòi phun nhiên liệu.",
          "Bên trong các-te máy."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hòa khí của động cơ Diesel được hình thành ở vị trí nào?",
        options: [
          "Trong bầu lọc khí.",
          "Trên đường ống nạp.",
          "Trong xi lanh vào cuối kỳ nén.",
          "Trong bơm cao áp."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Động cơ 2 kỳ hoàn thành một chu trình làm việc trong bao nhiêu vòng quay trục khuỷu?",
        options: [
          "1 vòng.",
          "2 vòng.",
          "0,5 vòng.",
          "4 vòng."
        ],
        correctAnswer: 0,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Ưu điểm chính của động cơ 4 kỳ so với động cơ 2 kỳ là:",
        options: [
          "Cấu tạo đơn giản, không có xupap.",
          "Tiết kiệm nhiên liệu và giảm ô nhiễm môi trường.",
          "Công suất trên cùng một dung tích lớn hơn.",
          "Trọng lượng máy nhẹ hơn."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Bộ phận nào giúp động cơ duy trì tốc độ quay ổn định và vượt qua các kỳ phụ?",
        options: [
          "Piston.",
          "Bánh đà.",
          "Thanh truyền.",
          "Trục cam."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Thân máy và nắp máy của động cơ ô tô hiện nay thường được làm bằng:",
        options: [
          "Nhựa tổng hợp chịu nhiệt.",
          "Hợp kim nhôm hoặc gang xám.",
          "Thép không gỉ (Inox).",
          "Sắt nguyên chất."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Nhiệm vụ quan trọng nhất của hệ thống bôi trơn là:",
        options: [
          "Cung cấp nhiên liệu cho máy.",
          "Giảm ma sát, làm mát, làm sạch và làm kín các bề mặt chi tiết.",
          "Đốt cháy các cặn bẩn trong máy.",
          "Tăng công suất cho động cơ."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Trong hệ thống bôi trơn cưỡng bức, dầu được vận chuyển đến các bề mặt ma sát nhờ:",
        options: [
          "Trọng lực tự nhiên.",
          "Áp suất do bơm dầu tạo ra.",
          "Sự vung té của trục khuỷu.",
          "Áp suất khí nén trong xi lanh."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Bầu lọc dầu trong hệ thống bôi trơn có vai trò:",
        options: [
          "Làm hạ nhiệt độ của dầu.",
          "Loại bỏ các tạp chất cơ học và mạt kim loại trong dầu.",
          "Tăng độ nhớt cho dầu bôi trơn.",
          "Ngăn không cho dầu chảy về các-te."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Tại sao một số động cơ cần có két làm mát dầu?",
        options: [
          "Để dầu không bị bay hơi.",
          "Để giữ nhiệt độ dầu ổn định, tránh dầu bị loãng quá mức khi máy nóng.",
          "Để lọc bụi mịn trong dầu.",
          "Để chứa thêm dầu dự phòng."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Tỷ số nén (ε) của động cơ được tính bằng công thức:",
        options: [
          "ε = Vh / Vc.",
          "ε = Vc / Va.",
          "ε = Va / Vc.",
          "ε = Va / Vh."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Khi áp suất dầu trong hệ thống vượt quá mức cho phép, bộ phận nào sẽ hoạt động?",
        options: [
          "Van hằng nhiệt.",
          "Van an toàn (Van điều áp).",
          "Bơm cao áp.",
          "Thước thăm dầu."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hệ thống làm mát bằng nước tuần hoàn cưỡng bức bao gồm những loại nào?",
        options: [
          "Loại hở và loại kín.",
          "Loại dùng quạt và loại không dùng quạt.",
          "Cả A và B đều đúng.",
          "Chỉ có loại bốc hơi."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      }
    ],
  },
  {
    id: "ice-mechanisms",
    chapter: "Chương 6: Động cơ đốt trong",
    title: "Mechanisms in ICE",
    titleVi: "Các cơ cấu trong động cơ đốt trong",
    description:
      "Cấu tạo và nguyên lí của cơ cấu trục khuỷu thanh truyền, phân phối khí, thân máy và nắp máy.",
    xp: 60,
    icon: "Settings",
    content: [
      {
        title: "Cơ cấu trục khuỷu thanh truyền",
        paragraphs: [
          "Pít tông: Gồm 3 phần là đỉnh (tiếp xúc trực tiếp với khí cháy), đầu (chứa các xéc măng khí và xéc măng dầu để làm kín) và thân (dẫn hướng chuyển động).",
          "Thanh truyền (Tay biên): Kết nối pít tông với trục khuỷu. Đầu nhỏ lắp với chốt pít tông, đầu to lắp với chốt khuỷu. Thân thanh truyền thường có tiết diện chữ I để tăng độ cứng vững.",
          "Trục khuỷu: Nhận lực từ thanh truyền để tạo ra mô men quay. Gồm cổ khuỷu (trục chính), chốt khuỷu (lắp đầu to thanh truyền), má khuỷu và đối trọng (giúp cân bằng động cơ).",
          "Bánh đà: Khối kim loại nặng gắn ở đuôi trục khuỷu, có tác dụng tích trữ động năng trong kì nổ để cung cấp cho các kì không sinh công, giúp trục khuỷu quay đều.",
        ],
        imageUrl: "diagram:crank-mechanism",
        imageAlt: "Cơ cấu trục khuỷu thanh truyền",
        imageMarkers: [
          { id: "1", x: 50, y: 32.5, labelX: 25, labelY: 32.5 },
          { id: "2", x: 50, y: 52.5, labelX: 25, labelY: 52.5 },
          { id: "3", x: 50, y: 80, labelX: 25, labelY: 80 },
          { id: "4", x: 68.75, y: 80, labelX: 85, labelY: 80 },
        ],
        legend: [
          { label: "1", description: "Pít tông" },
          { label: "2", description: "Thanh truyền" },
          { label: "3", description: "Trục khuỷu" },
          { label: "4", description: "Bánh đà" },
        ],
      },
      {
        title: "Cơ cấu phân phối khí",
        paragraphs: [
          "Nhiệm vụ: Đóng mở các cửa nạp và cửa thải đúng thời điểm để nạp đầy khí mới và thải sạch khí đã cháy.",
          "Cấu tạo: Động cơ 4 kì thường dùng cơ cấu phân phối khí dùng xu páp (xu páp treo hoặc xu páp đặt). Các chi tiết chính gồm: trục cam, con đội, đũa đẩy, cò mổ, xu páp và lò xo xu páp.",
          "Nguyên lí: Trục khuỷu dẫn động trục cam quay. Vấu cam đẩy con đội, đũa đẩy và cò mổ để ép lò xo, làm mở xu páp. Khi vấu cam quay qua, lò xo đẩy xu páp đóng kín lại.",
        ],
        imageUrl: "diagram:valve-mechanism",
        imageAlt: "Cơ cấu phân phối khí",
        imageMarkers: [
          { id: "1", x: 25, y: 37.5, labelX: 10, labelY: 37.5 },
          { id: "2", x: 50, y: 20, labelX: 50, labelY: 5 },
          { id: "3", x: 66.25, y: 50, labelX: 85, labelY: 50 },
          { id: "4", x: 66.25, y: 37.5, labelX: 85, labelY: 37.5 },
        ],
        legend: [
          { label: "1", description: "Trục cam" },
          { label: "2", description: "Cò mổ" },
          { label: "3", description: "Xu páp" },
          { label: "4", description: "Lò xo xu páp" },
        ],
      },
      {
        title: "Thân máy và nắp máy",
        paragraphs: [
          "Thân máy: Là khung xương của động cơ, nơi lắp đặt hầu hết các cụm chi tiết. Phần trên chứa xi lanh, phần dưới là cacte chứa trục khuỷu và dầu bôi trơn. Thân máy có các đường ống dẫn nước làm mát (áo nước) hoặc các cánh tản nhiệt.",
          "Nắp máy (Cylinder head): Đậy kín phía trên xi lanh, cùng với đỉnh pít tông tạo thành buồng cháy. Nắp máy có cấu tạo rất phức tạp vì phải bố trí đường ống nạp, ống thải, xu páp, bugi hoặc vòi phun nhiên liệu, và các áo nước làm mát.",
        ],
      },
    ],
    quiz: [
      {
        type: "multiple-choice",
        question: "Van hằng nhiệt có chức năng gì trong hệ thống làm mát?",
        options: [
          "Tăng tốc độ quay của quạt gió.",
          "Làm nước mát lạnh đi nhanh chóng.",
          "Điều hướng nước mát về bơm hoặc qua két tản nhiệt tùy theo nhiệt độ.",
          "Đo nhiệt độ để báo lên bảng đồng hồ."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Khi động cơ vừa mới khởi động (nhiệt độ nước < 70°C), nước làm mát sẽ:",
        options: [
          "Chảy qua két tản nhiệt để làm lạnh.",
          "Đi tắt theo đường ống phụ về thẳng bơm nước.",
          "Ngừng tuần hoàn để máy nhanh nóng.",
          "Được xả bỏ ra ngoài môi trường."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Cánh tản nhiệt đúc ngoài thân xi lanh là đặc điểm của hệ thống làm mát nào?",
        options: [
          "Làm mát bằng nước tuần hoàn.",
          "Làm mát bằng không khí.",
          "Làm mát bằng dầu cưỡng bức.",
          "Làm mát bằng dung dịch hóa chất."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hệ thống nhiên liệu động cơ xăng dùng bộ chế hòa khí sử dụng bộ phận nào để trộn xăng với không khí?",
        options: [
          "Vòi phun điện tử.",
          "Bộ chế hòa khí (Bình xăng con).",
          "Bơm cao áp Diesel."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Trong hệ thống phun xăng điện tử (EFI), xăng được phun vào vị trí nào?",
        options: [
          "Phía trước xupap nạp hoặc trực tiếp vào buồng cháy.",
          "Vào các-te để bôi trơn piston.",
          "Vào bầu lọc gió để trộn đều.",
          "Vào két nước tản nhiệt."
        ],
        correctAnswer: 0,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Khối điều khiển điện tử (ECU) trong hệ thống EFI đóng vai trò:",
        options: [
          "Là nguồn cung cấp điện cho bugi.",
          "Là máy bơm hút xăng từ bình.",
          "Tiếp nhận tín hiệu từ các cảm biến để tính toán lượng xăng phun tối ưu.",
          "Điều khiển việc đóng mở các xupap nạp xả."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Bộ phận nào trong hệ thống nhiên liệu Diesel tạo ra áp suất rất cao để phun tơi nhiên liệu?",
        options: [
          "Bơm chuyển (bơm thấp áp).",
          "Bơm cao áp.",
          "Vòi phun.",
          "Bầu lọc tinh."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Thời điểm vòi phun Diesel phun nhiên liệu vào xi lanh là:",
        options: [
          "Đầu kỳ nạp.",
          "Giữa kỳ nén.",
          "Cuối kỳ nén (gần ĐCT).",
          "Sau khi piston đã đi xuống kỳ nổ."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hệ thống đánh lửa là bộ phận bắt buộc phải có trên:",
        options: [
          "Động cơ Diesel.",
          "Động cơ xăng.",
          "Động cơ phản lực.",
          "Động cơ chạy bằng khí gas hóa lỏng."
        ],
        correctAnswer: 0,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Nhiệm vụ của biến áp đánh lửa (Bobin) là:",
        options: [
          "Biến dòng điện áp thấp (12V) thành dòng điện áp cao (hàng chục nghìn V).",
          "Tích trữ điện năng để đề máy.",
          "Điều chỉnh khe hở của bugi."
        ],
        correctAnswer: 0,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Ưu điểm lớn nhất của hệ thống đánh lửa điện tử (không tiếp điểm) là:",
        options: [
          "Đánh lửa mạnh, chính xác và không bị mòn má vít cơ khí.",
          "Cấu tạo rất đơn giản, dễ sửa chữa bằng tay.",
          "Không cần sử dụng nguồn điện từ ắc quy.",
          "Giá thành sản xuất rẻ hơn hệ thống cũ."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hệ thống khởi động bằng động cơ điện lấy năng lượng từ:",
        options: [
          "Máy phát điện trên xe.",
          "Ắc quy.",
          "Trực tiếp từ bugi.",
          "Động cơ xăng phụ."
        ],
        correctAnswer: 0,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      }
    ],
  },
  {
    id: "ice-systems",
    chapter: "Chương 6: Động cơ đốt trong",
    title: "Systems in ICE",
    titleVi: "Các hệ thống trong động cơ đốt trong",
    description:
      "Hệ thống bôi trơn, làm mát, nhiên liệu, khởi động, đánh lửa và xử lí khí thải.",
    xp: 70,
    icon: "Tool",
    content: [
      {
        title: "Hệ thống bôi trơn cưỡng bức",
        paragraphs: [
          "Các thành phần chính (theo thứ tự tuần hoàn):",
          "1. Các-te dầu (Oil Pan/Sump): Chứa dầu nhờn.",
          "2. Lưới lọc dầu (Oil Strainer): Lọc thô tạp chất lớn.",
          "3. Bơm dầu (Oil Pump): Thường là bơm bánh răng, hút dầu từ các-te và tạo áp suất cao.",
          "4. Bộ lọc dầu (Oil Filter): Lọc sạch các tạp chất nhỏ trước khi đưa dầu đi bôi trơn.",
          "5. Van an toàn/Van điều áp (Relief Valve): Giữ áp suất dầu ổn định, tránh quá cao làm hỏng động cơ.",
          "6. Đường dầu chính (Oil Gallery): Các đường ống khoan trong thân máy, dẫn dầu đến các bộ phận.",
          "7. Vòi phun dầu (Oil Jet): Phun dầu làm mát đỉnh piston (trên các động cơ hiện đại).",
          "Nguyên lý hoạt động:",
          "1. Hút dầu: Khi động cơ hoạt động, bơm dầu hút dầu từ các-te qua lưới lọc.",
          "2. Lọc dầu: Dầu được đẩy qua lọc thô để loại bỏ cặn bẩn. Một phần dầu có thể qua lọc tinh.",
          "3. Bôi trơn: Dầu sạch áp suất cao đi theo đường dầu chính đến các bạc trục khuỷu, bạc thanh truyền và trục cam.",
          "4. Làm mát: Dầu sau khi bôi trơn chảy ngược về các-te.",
        ],
        imageUrl: "diagram:lubrication-system",
        imageAlt: "Hệ thống bôi trơn cưỡng bức",
        imageMarkers: [
          { id: "1", x: 50, y: 81.25, labelX: 50, labelY: 90 },
          { id: "2", x: 40, y: 75, labelX: 25, labelY: 75 },
          { id: "3", x: 40, y: 65, labelX: 25, labelY: 65 },
          { id: "4", x: 25.6, y: 50, labelX: 10, labelY: 50 },
          { id: "5", x: 32.5, y: 65, labelX: 32.5, labelY: 80 },
          { id: "6", x: 50, y: 37.5, labelX: 50, labelY: 25 },
          { id: "7", x: 52.5, y: 45, labelX: 65, labelY: 45 },
        ],
        legend: [
          { label: "1", description: "Các-te dầu" },
          { label: "2", description: "Lưới lọc dầu" },
          { label: "3", description: "Bơm dầu" },
          { label: "4", description: "Bộ lọc dầu" },
          { label: "5", description: "Van an toàn" },
          { label: "6", description: "Đường dầu chính" },
          { label: "7", description: "Vòi phun dầu" },
        ],
      },
      {
        title: "Hệ thống làm mát tuần hoàn cưỡng bức",
        paragraphs: [
          "Là loại hệ thống sử dụng bơm nước để tạo ra áp lực, bắt buộc nước làm mát lưu thông trong một vòng kín để giải nhiệt cho động cơ. Đây là hệ thống phổ biến nhất trên các dòng ô tô và máy móc hiện đại.",
          "Cấu tạo chính:",
          "- Bơm nước: Tạo áp lực để đẩy nước tuần hoàn trong hệ thống.",
          "- Két nước (Bộ tản nhiệt): Nơi nước nóng truyền nhiệt ra môi trường bên ngoài.",
          "- Quạt gió: Tăng tốc độ lưu thông không khí qua két nước để làm mát nước nhanh hơn.",
          "- Van hằng nhiệt: Điều tiết đường đi của nước tùy theo nhiệt độ động cơ.",
          "- Áo nước: Các khoang chứa nước bao quanh thân máy và nắp máy để thu nhiệt.",
          "Nguyên lý hoạt động:",
          "- Khi động cơ mới khởi động (Nước còn nguội): Van hằng nhiệt đóng đường nước về két. Bơm nước đẩy nước tuần hoàn ngắn trong áo nước rồi quay lại bơm để động cơ nhanh chóng đạt đến nhiệt độ làm việc tối ưu.",
          "- Khi nhiệt độ đạt ngưỡng (Khoảng 70 – 80 độ): Van hằng nhiệt bắt đầu mở hé, một phần nước đi về két để tản nhiệt, phần còn lại vẫn chảy tắt về bơm.",
          "- Khi động cơ nóng (Trên 80 -90 độ): Van hằng nhiệt mở hoàn toàn đường về két nước. Nước nóng từ động cơ đi qua két, được quạt gió làm mát rồi mới quay trở lại động cơ để tiếp tục chu kỳ.",
        ],
        imageUrl: "diagram:cooling-system",
        imageAlt: "Hệ thống làm mát bằng nước",
        imageMarkers: [
          { id: "1", x: 75, y: 56.25, labelX: 90, labelY: 56.25 },
          { id: "2", x: 75, y: 28.75, labelX: 90, labelY: 28.75 },
          { id: "3", x: 42.5, y: 30, labelX: 42.5, labelY: 15 },
          { id: "4", x: 60, y: 30, labelX: 60, labelY: 15 },
          { id: "5", x: 17.5, y: 25, labelX: 5, labelY: 25 },
          { id: "6", x: 17.5, y: 50, labelX: 5, labelY: 50 },
          { id: "7", x: 27.5, y: 50, labelX: 40, labelY: 50 },
          { id: "8", x: 42.5, y: 67.5, labelX: 42.5, labelY: 85 },
          { id: "9", x: 60, y: 46.25, labelX: 75, labelY: 46.25 },
          { id: "10", x: 60, y: 53.75, labelX: 45, labelY: 53.75 },
          { id: "11", x: 60, y: 65, labelX: 60, labelY: 85 },
          { id: "12", x: 75, y: 62.5, labelX: 90, labelY: 75 },
        ],
        legend: [
          { label: "1", description: "Thân máy" },
          { label: "2", description: "Nắp máy" },
          { label: "3", description: "Đường nước nóng ra khỏi động cơ" },
          { label: "4", description: "Van hằng nhiệt" },
          { label: "5", description: "Két nước" },
          { label: "6", description: "Giàn ống két nước" },
          { label: "7", description: "Quạt gió" },
          { label: "8", description: "Đường nước vào làm mát" },
          { label: "9", description: "Đường nước tắt về bơm" },
          { label: "10", description: "Bộ truyền dẫn động bơm" },
          { label: "11", description: "Bơm nước" },
          { label: "12", description: "Ống phân phối" },
        ],
      },
      {
        title: "Hệ thống nhiên liệu",
        paragraphs: [
          "Hệ thống nhiên liệu động cơ xăng (Phun xăng điện tử - EFI): Gồm Bình nhiên liệu, Bơm xăng, Bộ lọc xăng, Bộ điều chỉnh áp suất, Vòi phun và Khối điều khiển điện tử (ECU).",
          "Nguyên lý làm việc: Khi động cơ làm việc, bơm xăng hút xăng từ bình qua bầu lọc đưa đến vòi phun. Cảm biến gửi tín hiệu về ECU. ECU tính toán và gửi lệnh đến vòi phun để phun một lượng xăng chính xác vào khí nạp tạo thành hòa khí. Hòa khí được hút vào xilanh trong kỳ nạp.",
          "Hệ thống nhiên liệu động cơ Diesel: Không dùng bugi mà tự cháy dưới áp suất cao. Bơm cao áp nén nhiên liệu lên áp suất rất cao. Vòi phun phun nhiên liệu dưới dạng sương mù vào buồng cháy. Bầu lọc tinh và bầu lọc thô rất quan trọng vì động cơ Diesel nhạy cảm với bụi bẩn.",
        ],
        imageUrl: "diagram:fuel-system",
        imageAlt: "Sơ đồ hệ thống nhiên liệu",
        imageMarkers: [
          { id: "1", x: 20, y: 50, labelX: 20, labelY: 25 },
          { id: "2", x: 41.25, y: 50, labelX: 41.25, labelY: 25 },
          { id: "3", x: 59.375, y: 50, labelX: 59.375, labelY: 25 },
          { id: "4", x: 75, y: 25, labelX: 90, labelY: 25 },
          { id: "5", x: 75, y: 53.75, labelX: 90, labelY: 53.75 },
        ],
        legend: [
          { label: "1", description: "Thùng xăng/diesel" },
          { label: "2", description: "Bơm nhiên liệu" },
          { label: "3", description: "Bộ lọc" },
          { label: "4", description: "Vòi phun" },
          { label: "5", description: "Xi lanh động cơ" },
        ],
      },
      {
        title: "Hệ thống đánh lửa",
        paragraphs: [
          "Hệ thống đánh lửa trên động cơ xăng tạo ra tia lửa điện cao áp (xấp xỉ 40000 V trở lên) để đốt cháy hòa khí trong buồng đốt tại đúng thời điểm.",
          "Nhiệm vụ: Tạo tia lửa điện đủ mạnh, đánh lửa đúng thời điểm tùy thuộc vào tải trọng và tốc độ động cơ.",
          "Cấu tạo chính: Bugi (tạo tia lửa điện trực tiếp), Bobin (cuộn dây đánh lửa tăng điện áp từ 12V lên cao áp), Bộ chia điện hoặc ECU/IC (điều khiển ngắt dòng và chia điện), Nguồn điện (ắc quy/máy phát).",
          "Nguyên lý hoạt động cơ bản: Tích lũy năng lượng ở cuộn sơ cấp -> Ngắt dòng sơ cấp đột ngột -> Cảm ứng cao áp ở cuộn thứ cấp -> Đánh lửa qua bugi.",
        ],
        imageUrl: "diagram:ignition-system",
        imageAlt: "Sơ đồ cấu tạo hệ thống đánh lửa",
        imageMarkers: [
          { id: "1", x: 17.5, y: 50, labelX: 17.5, labelY: 25 },
          { id: "2", x: 41.25, y: 50, labelX: 41.25, labelY: 25 },
          { id: "3", x: 62.5, y: 50, labelX: 62.5, labelY: 25 },
          { id: "4", x: 82.5, y: 30, labelX: 95, labelY: 30 },
        ],
        legend: [
          { label: "1", description: "Ắc quy" },
          { label: "2", description: "Bobin (Cuộn dây đánh lửa)" },
          { label: "3", description: "Bộ chia điện / ECU" },
          { label: "4", description: "Bugi" },
        ],
      },
      {
        title: "Hệ thống xử lý khí thải",
        paragraphs: [
          "Nhiệm vụ: Giảm thiểu các thành phần độc hại (CO, HC, NOx, Bụi than) có trong khí thải của động cơ trước khi thải ra môi trường.",
          "Các phương pháp xử lý chính:",
          "- Bộ chuyển đổi xúc tác (động cơ Xăng): Bộ xúc tác 3 thành phần dùng kim loại quý để chuyển CO, HC thành CO2, H2O và khử NOx thành N2.",
          "- Hệ thống hồi lưu khí thải (EGR): Đưa một phần khí thải quay ngược trở lại đường ống nạp để giảm nhiệt độ cháy, ngăn chặn hình thành NOx.",
          "- Hệ thống xử lý khí thải động cơ Diesel (SCR & DPF): DPF giữ lại và đốt cháy hạt muội than. SCR phun dung dịch (AdBlue) để biến NOx thành N2 và hơi nước.",
        ],
      },
    ],
    quiz: [
      {
        type: "multiple-choice",
        question: "Khớp truyền động (Bendix) trong máy đề có tác dụng:",
        options: [
          "Chỉ truyền mô men một chiều từ motor điện sang vành răng bánh đà.",
          "Làm mát cho motor đề khi quay lâu.",
          "Đánh lửa giúp động cơ nổ nhanh hơn.",
          "Ngắt điện ắc quy khi máy đã nổ."
        ],
        correctAnswer: 0,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Bộ xúc tác 3 thành phần (Catalytic Converter) dùng để khử loại khí độc nào?",
        options: [
          "CO, HC, NOx.",
          "CO2, N2, O2.",
          "SO2 và bụi mịn.",
          "Hơi nước và chì."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hệ thống xử lý khí thải SCR trên xe Diesel hiện đại sử dụng dung dịch gì?",
        options: [
          "Nước cất.",
          "Dầu hỏa.",
          "Dung dịch Urea (AdBlue).",
          "Cồn công nghiệp."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Chức năng của hệ thống EGR là:",
        options: [
          "Tăng lượng oxy nạp vào để máy khỏe hơn.",
          "Đưa một phần khí thải quay lại buồng cháy để giảm nồng độ khí độc NOx.",
          "Lọc sạch bụi bẩn trong khí thải trước khi ra ngoài.",
          "Tăng áp suất khí nén trong xi lanh."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Nếu bầu lọc dầu bị tắc hoàn toàn, dầu bôi trơn sẽ chuyển động như thế nào?",
        options: [
          "Ngừng chảy hoàn toàn, động cơ bị bó máy ngay lập tức.",
          "Chảy qua van an toàn đến thẳng đường dầu chính (không qua lọc).",
          "Chảy ngược lại bình chứa để chờ thay lọc mới.",
          "Chảy ra ngoài môi trường qua lỗ thoát."
        ],
        correctAnswer: 0,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hệ thống bôi trơn các-te rời (các-te khô) khác hệ thống các-te ướt ở chỗ:",
        options: [
          "Dầu được chứa ở một thùng riêng biệt bên ngoài động cơ.",
          "Không cần sử dụng bơm dầu.",
          "Không cần bầu lọc dầu.",
          "Dầu được phun trực tiếp vào đỉnh piston."
        ],
        correctAnswer: 0,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Cảm biến Oxy (Lambda) gắn trên đường ống xả có nhiệm vụ:",
        options: [
          "Làm mát khí thải.",
          "Đo lượng oxy dư để ECU điều chỉnh tỷ lệ hòa khí (xăng/khí) cho chuẩn.",
          "Cung cấp thêm oxy cho bộ xúc tác.",
          "Báo hiệu khi ống pô bị thủng."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Nhiệm vụ của bầu lọc gió là:",
        options: [
          "Làm sạch bụi bẩn trong không khí nạp vào.",
          "Giảm tiếng ồn khi động cơ hút khí.",
          "Làm mát luồng không khí nạp.",
          "Cả A và B đều đúng."
        ],
        correctAnswer: 3,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Trong hệ thống làm mát bằng nước, bộ phận nào có tác dụng đẩy nước tuần hoàn?",
        options: [
          "Két nước.",
          "Quạt gió.",
          "Bơm nước.",
          "Van hằng nhiệt."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Bugi được phân loại thành \"Bugi nóng\" và \"Bugi lạnh\" dựa vào:",
        options: [
          "Khả năng tản nhiệt của bugi.",
          "Chiều dài của phần cách điện.",
          "Cả A và B đều đúng.",
          "Màu sắc của tia lửa điện."
        ],
        correctAnswer: 0,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hiện tượng \"bị e\" (lọt không khí) trong hệ thống nhiên liệu Diesel sẽ dẫn đến:",
        options: [
          "Động cơ chạy nhanh hơn bình thường.",
          "Động cơ không nổ được hoặc nổ rồi chết máy ngay.",
          "Tiết kiệm nhiên liệu hơn.",
          "Động cơ xả khói đen mù mịt."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Mục đích của việc thay dầu và lọc dầu định kỳ cho động cơ là:",
        options: [
          "Duy trì khả năng bôi trơn tối ưu.",
          "Loại bỏ các cặn bẩn và axit hình thành trong quá trình cháy.",
          "Bảo vệ các chi tiết máy khỏi mài mòn và rỉ sét.",
          "Tất cả các ý trên đều đúng."
        ],
        correctAnswer: 3,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      }
    ],
  },
  // Chương 7: Ô tô
  {
    id: "auto-overview",
    chapter: "Chương 7: Ô tô",
    title: "General Overview of Automobile",
    titleVi: "Khái quát chung về ô tô",
    description: "Vai trò và cấu tạo chung của ô tô.",
    xp: 50,
    icon: "Truck",
    content: [
      {
        title: "Vai trò của ô tô trong đời sống và sản xuất",
        paragraphs: [
          "Trước khi ô tô ra đời, giao thông vận tải đường bộ rất khó khăn.",
          "Ngày nay, ô tô là phương tiện giao thông vận tải chính trên đường bộ và giúp cơ giới hóa hoạt động sản xuất.",
          "Ô tô có vai trò quan trọng đối với cuộc sống và sản xuất, nhưng cũng gây ra mặt tiêu cực như gây tai nạn giao thông, ô nhiễm môi trường và cạn kiệt tài nguyên thiên nhiên.",
          "Người sử dụng ô tô cần có ý thức, trách nhiệm cao đối với xã hội và môi trường tự nhiên của đất nước.",
        ],
      },
      {
        title: "Cấu tạo chung của ô tô",
        paragraphs: [
          "Một số bộ phận chính của ô tô bao gồm: Động cơ, Hệ thống truyền lực, Bánh xe, Hệ thống lái, Hệ thống phanh, Khung vỏ.",
          "Động cơ: tạo nguồn mô men chủ động để xe chuyển động.",
          "Hệ thống truyền lực: truyền và biến đổi mô men chủ động đến các bánh xe để xe có thể chuyển động, bao gồm li hợp, hộp số, trục các đăng, truyền lực chính và bộ vi sai.",
          "Bánh xe và hệ thống treo: đỡ trọng lượng của xe, tiếp nhận lực tác dụng từ mặt đường để xe có thể chuyển động êm dịu và an toàn.",
          "Hệ thống lái: điều khiển hướng chuyển động của xe.",
          "Hệ thống phanh: điều khiển giảm tốc độ hoặc dừng xe, bao gồm cơ cấu phanh và bộ phận dẫn động điều khiển phanh.",
          "Khung vỏ: giá đỡ chính để lắp đặt các bộ phận của xe, tạo các khoang chứa động cơ, khoang hành khách và khoang chở hàng của xe.",
        ],
        imageUrl: "diagram:car-chassis",
        imageAlt: "Sơ đồ cấu tạo chung của ô tô",
        imageMarkers: [
          { id: "1", x: 28.75, y: 50, labelX: 28.75, labelY: 25 },
          { id: "2", x: 36.875, y: 50, labelX: 36.875, labelY: 75 },
          { id: "3", x: 43.75, y: 50, labelX: 43.75, labelY: 25 },
          { id: "4", x: 58.75, y: 50, labelX: 58.75, labelY: 75 },
          { id: "5", x: 68.75, y: 50, labelX: 85, labelY: 50 },
          { id: "6", x: 68.75, y: 37.5, labelX: 85, labelY: 37.5 },
          { id: "7", x: 68.75, y: 25, labelX: 85, labelY: 25 },
        ],
        legend: [
          { label: "1", description: "Động cơ" },
          { label: "2", description: "Li hợp" },
          { label: "3", description: "Hộp số" },
          { label: "4", description: "Truyền lực các đăng" },
          { label: "5", description: "Truyền lực chính và bộ vi sai" },
          { label: "6", description: "Bán trục" },
          { label: "7", description: "Bánh xe chủ động" },
        ],
      },
      {
        title: "Sự phối hợp giữa các hệ thống",
        paragraphs: [
          "Khi người lái đạp ga, động cơ tạo ra mô men quay. Mô men này được Hệ thống truyền lực (li hợp, hộp số, trục các đăng, vi sai) biến đổi và truyền tới các Bánh xe chủ động.",
          "Sự tương tác giữa bánh xe và mặt đường tạo ra lực đẩy xe tiến về phía trước. Trong quá trình di chuyển, Hệ thống treo hấp thụ các cú sốc từ mặt đường, giúp xe chạy êm ái.",
          "Người lái sử dụng Hệ thống lái để thay đổi hướng đi và sử dụng Hệ thống phanh để giảm tốc độ hoặc dừng xe an toàn khi cần thiết.",
        ],
      },
    ],
    quiz: [
      {
        type: "multiple-choice",
        question: "Các bộ phận chính của một chiếc ô tô bao gồm:",
        options: [
          "Động cơ, hệ thống truyền lực, bánh xe.",
          "Hệ thống lái, hệ thống phanh, khung vỏ.",
          "Hệ thống điện và điện tử.",
          "Tất cả các bộ phận trên."
        ],
        correctAnswer: 3,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Bộ phận nào tạo ra nguồn mô men chủ động để xe chuyển động?",
        options: [
          "Động cơ.",
          "Hệ thống truyền lực.",
          "Hệ thống lái.",
          "Hộp số."
        ],
        correctAnswer: 0,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hệ thống truyền lực trên ô tô bao gồm các bộ phận nào?",
        options: [
          "Li hợp, hộp số, trục các đăng, truyền lực chính và bộ vi sai.",
          "Động cơ, bánh xe, hệ thống phanh.",
          "Vô lăng, trục lái, cơ cấu lái.",
          "Xilanh, piston, trục khuỷu."
        ],
        correctAnswer: 0,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Nhiệm vụ của hệ thống truyền lực là:",
        options: [
          "Tạo ra năng lượng nhiệt.",
          "Truyền và biến đổi mô men từ động cơ đến các bánh xe.",
          "Điều khiển hướng chuyển động của xe.",
          "Giảm tốc độ và dừng xe."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Bộ phận nào dùng để ngắt hoặc nối truyền động từ động cơ đến hộp số?",
        options: [
          "Li hợp (Côn).",
          "Hộp số.",
          "Trục các đăng.",
          "Bộ vi sai."
        ],
        correctAnswer: 0,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hộp số trên ô tô có nhiệm vụ chính là:",
        options: [
          "Đốt cháy nhiên liệu sinh công.",
          "Thay đổi mô men và tốc độ của xe, cho phép xe chạy lùi.",
          "Điều khiển bánh xe dẫn hướng.",
          "Nạp điện cho ắc quy."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hệ thống nào giúp ô tô chuyển động êm dịu khi đi qua đường gồ ghề?",
        options: [
          "Hệ thống lái.",
          "Hệ thống phanh.",
          "Hệ thống treo.",
          "Hệ thống truyền lực."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hệ thống lái có nhiệm vụ gì?",
        options: [
          "Thay đổi hoặc duy trì hướng chuyển động của ô tô.",
          "Dừng xe trong trường hợp khẩn cấp.",
          "Truyền lực từ động cơ tới bánh xe.",
          "Tăng công suất cho động cơ."
        ],
        correctAnswer: 0,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Để giảm tốc độ hoặc dừng hẳn ô tô, người lái sử dụng hệ thống nào?",
        options: [
          "Hệ thống treo.",
          "Hệ thống truyền lực.",
          "Hệ thống phanh.",
          "Hệ thống lái."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Khung vỏ ô tô có vai trò gì?",
        options: [
          "Lắp đặt các hệ thống và bộ phận của ô tô.",
          "Tạo không gian chứa người và hàng hóa.",
          "Bảo vệ người ngồi trên xe và tạo hình dáng thẩm mỹ.",
          "Tất cả các đáp án trên."
        ],
        correctAnswer: 3,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      }
    ],
  },
  {
    id: "powertrain",
    chapter: "Chương 7: Ô tô",
    title: "Powertrain System",
    titleVi: "Hệ thống truyền lực",
    description:
      "Cấu tạo và hoạt động của li hợp, hộp số, truyền lực chính và vi sai.",
    xp: 60,
    icon: "Cpu",
    content: [
      {
        title: "Cấu tạo hệ thống truyền lực",
        paragraphs: [
          "Cấu tạo chung của hệ thống truyền lực bao gồm các bộ phận chính: Li hợp, Hộp số, Trục các đăng, Truyền lực chính và bộ vi sai, Bán trục.",
        ],
      },
      {
        title: "Li hợp",
        paragraphs: [
          "Nhiệm vụ: Bộ phận đầu tiên của hệ thống truyền lực. Có nhiệm vụ ngắt tạm thời dòng truyền mô men của động cơ đến hộp số để có thể dừng xe hoặc chuyển số. Nối êm dịu dòng truyền mô men của động cơ đến hộp số và đảm bảo an toàn cho động cơ và các bộ phận khác của hệ thống truyền lực.",
          "Cấu tạo: Loại li hợp ma sát khô một đĩa thường đóng được sử dụng phổ biến trên ô tô con. Đĩa ma sát được lắp trên trục li hợp, nằm giữa bánh đà động cơ và đĩa ép. Đĩa ma sát luôn quay cùng với trục li hợp và có thể di chuyển trượt dọc trục.",
          "Nguyên lí hoạt động: Trong trạng thái bình thường (li hợp đóng), đĩa ma sát được kẹp chặt giữa bánh đà và đĩa ép, mô men của động cơ được truyền từ bánh đà đến đĩa ma sát qua trục li hợp đến hộp số. Bộ phận dẫn động điều khiển li hợp truyền lực điều khiển của người lái từ bàn đạp đến đĩa ép để mở li hợp.",
        ],
        imageUrl: "diagram:clutch",
        imageAlt: "Li hợp ô tô con",
        imageMarkers: [
          { id: "1", x: 33.75, y: 50, labelX: 20, labelY: 50 },
          { id: "2", x: 38.75, y: 30, labelX: 38.75, labelY: 15 },
          { id: "3", x: 43.75, y: 50, labelX: 43.75, labelY: 80 },
          { id: "4", x: 46.25, y: 30, labelX: 55, labelY: 20 },
          { id: "5", x: 75, y: 50, labelX: 75, labelY: 65 },
          { id: "6", x: 54.375, y: 50, labelX: 54.375, labelY: 30 },
        ],
        legend: [
          { label: "1", description: "Bánh đà động cơ" },
          { label: "2", description: "Đĩa ma sát" },
          { label: "3", description: "Đĩa ép" },
          { label: "4", description: "Lò xo ép" },
          { label: "5", description: "Trục li hợp" },
          { label: "6", description: "Vòng bi tì" },
        ],
      },
      {
        title: "Hộp số",
        paragraphs: [
          "Nhiệm vụ: Nối hoặc ngắt (lâu dài) dòng truyền mô men từ động cơ đến các bánh xe chủ động, thay đổi tỉ số truyền. Để thay đổi mô men chủ động và vận tốc của bánh xe chủ động cho phù hợp với các điều kiện hoạt động của xe. Đổi chiều mô men chủ động đến bánh xe để ô tô có thể chuyển động lùi.",
          "Cấu tạo: Cấu tạo của hộp số trên ô tô hiện nay được phân thành loại tự động và loại thường. Hộp số thường phổ biến trên ô tô con là loại hộp số hai trục, không có trục trung gian. Hộp số thường bao gồm ba trục: Trục sơ cấp, Trục trung gian, Trục thứ cấp.",
          "Nguyên lí hoạt động: Người lái xe mở li hợp sau đó dịch chuyển cần số để nối trục thứ cấp với một bánh răng đang quay trên trục đó. Mô men chủ động từ trục sơ cấp được truyền đến trục thứ cấp với một tỉ số truyền nhất định. Khi dịch chuyển cần số đến vị trí số lùi, bánh răng trung gian số lùi ăn khớp đồng thời với bánh răng và bánh răng số lùi.",
        ],
      },
      {
        title: "Truyền lực chính và bộ vi sai",
        paragraphs: [
          "Nhiệm vụ: Bộ truyền lực chính nhận mô men chủ động từ hộp số và biến đổi độ lớn, phương quay (nếu cần) trước khi truyền đến bộ vi sai. Bộ vi sai phân phối mô men chủ động đến các bánh xe chủ động và cho phép chúng quay với các vận tốc góc khác nhau.",
          "Cấu tạo: Bộ truyền lực chính thường được thiết kế chế tạo chung với bộ vi sai thành một cụm ở trong cầu chủ động. Gồm bánh răng chủ động và bánh răng bị động để tạo tỉ số truyền lực chính. Bộ vi sai phổ biến là loại bộ vi sai bánh răng côn.",
          "Nguyên lí hoạt động: Khi xe vào đường vòng, các bánh răng hành tinh có thể tự quay quanh mình. Các bánh răng nối đến các bánh xe chủ động qua các bản trục có thể quay với vận tốc khác nhau.",
        ],
        imageUrl: "diagram:differential",
        imageAlt: "Truyền lực chính và bộ vi sai",
        imageMarkers: [
          { id: "1", x: 46.875, y: 50, labelX: 30, labelY: 30 },
          { id: "2", x: 53.75, y: 20, labelX: 53.75, labelY: 5 },
          { id: "3", x: 60, y: 50, labelX: 60, labelY: 75 },
          { id: "4", x: 62.5, y: 40, labelX: 75, labelY: 25 },
          { id: "5", x: 75, y: 50, labelX: 85, labelY: 50 },
        ],
        legend: [
          { label: "1", description: "Bánh răng chủ động truyền lực chính" },
          { label: "2", description: "Bánh răng bị động truyền lực chính" },
          { label: "3", description: "Các bánh răng bán trục" },
          { label: "4", description: "Bánh răng hành tinh" },
          { label: "5", description: "Bán trục" },
        ],
      },
    ],
    quiz: [
      {
        type: "multiple-choice",
        question: "Hệ thống điện và điện tử trên ô tô bao gồm:",
        options: [
          "Nguồn điện (ắc quy, máy phát).",
          "Hệ thống khởi động, đánh lửa, chiếu sáng, tín hiệu.",
          "Các hệ thống điều khiển thông minh và an toàn.",
          "Tất cả các thành phần trên."
        ],
        correctAnswer: 3,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Ý nào sau đây là tác động tiêu cực của ô tô đối với môi trường?",
        options: [
          "Giúp cơ giới hóa sản xuất.",
          "Gây ô nhiễm không khí do khí thải và tiếng ồn.",
          "Rút ngắn thời gian di chuyển.",
          "Vận chuyển được khối lượng hàng hóa lớn."
        ],
        correctAnswer: 3,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Người lái xe cần làm gì trước khi khởi động xe để đảm bảo an toàn?",
        options: [
          "Kiểm tra áp suất lốp.",
          "Điều chỉnh vị trí ghế và gương chiếu hậu.",
          "Thắt dây an toàn.",
          "Thực hiện tất cả các việc trên."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Khi lái xe trên đoạn đường trơn trượt, người lái nên:",
        options: [
          "Phanh gấp để dừng xe nhanh.",
          "Quay vành lái đột ngột.",
          "Đi chậm và tránh phanh gấp, tránh quay vành lái đột ngột.",
          "Tăng ga thật mạnh để vượt qua."
        ],
        correctAnswer: 3,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Bộ phận nào cho phép các bánh xe quay với tốc độ khác nhau khi xe vào đường vòng?",
        options: [
          "Li hợp.",
          "Hộp số.",
          "Bộ vi sai.",
          "Trục các đăng."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hệ thống phanh hiện đại thường được trang bị thêm hệ thống nào để chống bó cứng bánh xe?",
        options: [
          "Hệ thống EFI.",
          "Hệ thống ABS.",
          "Hệ thống SCR.",
          "Hệ thống EGR."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Để đảm bảo an toàn giao thông, người ngồi trên ô tô cần:",
        options: [
          "Mở cửa xe ngay khi xe vừa dừng lại.",
          "Thắt dây an toàn và ngồi đúng tư thế.",
          "Nhoài người ra ngoài cửa sổ để quan sát.",
          "Sử dụng điện thoại khi đang lái xe."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Máy phát điện trên ô tô có nhiệm vụ:",
        options: [
          "Khởi động động cơ.",
          "Cung cấp điện cho các thiết bị và nạp điện cho ắc quy khi máy đang nổ.",
          "Tạo ra tia lửa điện để đốt cháy xăng.",
          "Thay thế hoàn toàn ắc quy."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hệ thống truyền lực có bộ phận \"Trục các đăng\" nhằm mục đích:",
        options: [
          "Thay đổi tốc độ xe.",
          "Truyền mô men giữa các trục không thẳng hàng hoặc có sự thay đổi khoảng cách.",
          "Ngắt truyền động khẩn cấp.",
          "Bôi trơn các bánh răng."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Vai trò chính của ô tô trong đời sống và sản xuất là:",
        options: [
          "Là phương tiện giao thông vận tải đường bộ chính.",
          "Giúp vận chuyển người và hàng hóa nhanh chóng, thuận tiện.",
          "Thúc đẩy giao thương và phát triển kinh tế.",
          "Tất cả các ý trên."
        ],
        correctAnswer: 3,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      }
    ],
  },
  {
    id: "wheels-suspension",
    chapter: "Chương 7: Ô tô",
    title: "Wheels and Suspension System",
    titleVi: "Bánh xe và hệ thống treo",
    description:
      "Cấu tạo bánh xe và các bộ phận của hệ thống treo giúp xe chạy êm dịu.",
    xp: 60,
    icon: "Disc",
    content: [
      {
        title: "Bánh xe ô tô",
        paragraphs: [
          "Bánh xe là bộ phận của ô tô tiếp xúc với mặt đường để đỡ trọng lượng và tiếp nhận phản lực từ mặt đường.",
          "Cấu tạo bánh xe gồm vành, lốp, van khí và có thể có săm. Vành trên ô tô con được chế tạo bằng hợp kim nhôm liền với đĩa thành một khối.",
          "Lốp được chế tạo từ cao su và có cấu tạo gồm nhiều lớp khá phức tạp, bao gồm các lớp sợi mành, tanh lốp và lớp hoa lốp ở mặt ngoài.",
        ],
        imageUrl: "diagram:wheel",
        imageAlt: "Bánh xe ô tô",
        imageMarkers: [
          { id: "1", x: 50, y: 50, labelX: 25, labelY: 50 },
          { id: "2", x: 50, y: 25, labelX: 25, labelY: 25 },
          { id: "3", x: 56.25, y: 35, labelX: 75, labelY: 35 },
        ],
        legend: [
          { label: "1", description: "Vành" },
          { label: "2", description: "Lốp" },
          { label: "3", description: "Van khí" },
        ],
      },
      {
        title: "Hệ thống treo",
        paragraphs: [
          "Nhiệm vụ: Hệ thống treo có tác dụng giảm lực va đập giữa bánh xe và mặt đường, giúp xe chuyển động êm dịu và an toàn. Hệ thống treo được phân loại thành hai loại chính: hệ thống treo độc lập (thường dùng trên ô tô con) và hệ thống treo phụ thuộc (thường dùng trên ô tô tải).",
          "Cấu tạo: Hệ thống treo ô tô gồm bộ phận đàn hồi, giảm chấn và liên kết.",
          "- Bộ phận đàn hồi nối đàn hồi bánh xe với thân xe, có 3 loại: lò xo xoắn, nhíp lá và bóng khí nén.",
          "- Bộ phận giảm chấn tạo lực cản chống lại sự dịch chuyển của bánh xe, giúp dập tắt nhanh chóng dao động của bánh xe và thân xe.",
          "- Bộ phận liên kết gồm các thanh đòn và khớp nối giúp truyền các thành phần phản lực của mặt đường tác dụng vào bánh xe lên thân xe.",
          "Nguyên lí làm việc: Bộ phận đàn hồi liên kết giữa bánh xe và thân xe giúp giảm thiểu lực va đập truyền lên thân xe khi xe chuyển động trên mặt đường không bằng phẳng. Bộ phận giảm chấn tạo ra lực cản và dập tắt nhanh chóng dao động, giúp xe chuyển động êm dịu và an toàn.",
        ],
        imageUrl: "diagram:suspension",
        imageAlt: "Hệ thống treo",
        imageMarkers: [
          { id: "1", x: 48.1, y: 50, labelX: 25, labelY: 25 },
          { id: "2", x: 50, y: 35, labelX: 75, labelY: 25 },
          { id: "3", x: 37.5, y: 77.5, labelX: 75, labelY: 75 },
        ],
        legend: [
          { label: "1", description: "Bộ phận đàn hồi" },
          { label: "2", description: "Bộ phận giảm chấn" },
          { label: "3", description: "Bộ phận liên kết" },
        ],
      },
    ],
    quiz: [
      {
        type: "multiple-choice",
        question: "Hệ thống phanh trên ô tô thường được phân loại theo:",
        options: [
          "Theo kết cấu cơ cấu phanh (phanh đĩa, phanh tang trống).",
          "Theo dẫn động phanh (phanh thủy lực, phanh khí nén).",
          "Theo công dụng (phanh chính, phanh dừng).",
          "Tất cả các cách phân loại trên."
        ],
        correctAnswer: 3,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Khi đi xe ô tô, việc điều chỉnh gương chiếu hậu giúp người lái:",
        options: [
          "Nhìn rõ phía trước xe.",
          "Quan sát được phía sau và hai bên thân xe, hạn chế điểm mù.",
          "Trang trí cho xe đẹp hơn.",
          "Kiểm tra tình trạng hành khách phía sau."
        ],
        correctAnswer: 3,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Những yếu tố nào tiềm ẩn nguy cơ mất an toàn khi vận hành ô tô?",
        options: [
          "Tình trạng kĩ thuật của xe không đảm bảo.",
          "Người lái sử dụng rượu bia hoặc chất kích thích.",
          "Vi phạm luật giao thông đường bộ.",
          "Tất cả các yếu tố trên."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hệ thống treo bao gồm các thành phần chính nào?",
        options: [
          "Bộ phận đàn hồi, bộ phận dẫn hướng và bộ phận giảm chấn.",
          "Bánh xe, lốp xe và vành xe.",
          "Trục lái và vành tay lái.",
          "Má phanh và đĩa phanh."
        ],
        correctAnswer: 0,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Tại sao phải thường xuyên kiểm tra tình trạng kĩ thuật của ô tô?",
        options: [
          "Để xe luôn bóng loáng.",
          "Để kịp thời phát hiện hư hỏng, đảm bảo an toàn và tăng tuổi thọ cho xe.",
          "Để tiết kiệm xăng tối đa.",
          "Vì luật pháp bắt buộc phải rửa xe hàng ngày."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Trong hệ thống lái, bộ phận nào tiếp nhận lực điều khiển trực tiếp từ tay người lái?",
        options: [
          "Trục lái.",
          "Vành lái (Vô lăng).",
          "Cơ cấu lái.",
          "Bánh xe dẫn hướng."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Phanh dừng (phanh tay) được sử dụng chủ yếu khi nào?",
        options: [
          "Khi đỗ xe hoặc dừng xe trong thời gian dài.",
          "Khi xe đang chạy ở tốc độ cao.",
          "Khi muốn vượt xe khác.",
          "Khi xe vừa khởi động."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hệ thống điện tử hỗ trợ đỗ xe giúp ích gì cho người lái?",
        options: [
          "Giúp xe chạy nhanh hơn.",
          "Cảnh báo vật cản và hỗ trợ đưa xe vào vị trí đỗ an toàn.",
          "Tự động thay dầu cho máy.",
          "Giảm lượng khí thải độc hại."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Lốp xe ô tô quá mòn sẽ gây ra hậu quả gì?",
        options: [
          "Xe chạy êm hơn.",
          "Giảm độ bám đường, dễ gây trượt bánh và nổ lốp, mất an toàn.",
          "Giúp tiết kiệm nhiên liệu.",
          "Không ảnh hưởng gì đến vận hành."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Một chiếc ô tô hiện đại thường sử dụng nguồn điện từ:",
        options: [
          "Pin năng lượng mặt trời.",
          "Ắc quy và máy phát điện.",
          "Động cơ đốt trong trực tiếp.",
          "Điện lưới gia đình."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      }
    ],
  },
  {
    id: "steering-system",
    chapter: "Chương 7: Ô tô",
    title: "Steering System",
    titleVi: "Hệ thống lái",
    description:
      "Cấu tạo và nguyên lí hoạt động của hệ thống lái và trợ lực lái.",
    xp: 50,
    icon: "Compass",
    content: [
      {
        title: "Cơ cấu lái",
        paragraphs: [
          "Nhiệm vụ: Cơ cấu lái tạo ra tỉ số truyền chính của hệ thống lái để người lái có thể quay bánh xe đến các góc độ khác nhau.",
          "Cấu tạo: Có nhiều loại cơ cấu lái khác nhau, bao gồm cơ cấu lái bánh răng - thanh răng được sử dụng phổ biến trên ô tô con. Cơ cấu lái bánh răng - thanh răng bao gồm bánh răng và thanh răng lắp chung trong một vỏ hộp để tạo ra tỉ số truyền.",
          "Nguyên lí hoạt động: Khi quay vành lái, bánh răng quay và làm thanh răng dịch chuyển qua lại. Các thanh đòn sẽ quay bánh xe dẫn hướng sang bên phải hoặc sang bên trái.",
        ],
        imageUrl: "diagram:steering",
        imageAlt:
          "Sơ đồ cấu tạo hệ thống lái với cơ cấu lái bánh răng - thanh răng",
        imageMarkers: [
          { id: "1", x: 25, y: 25, labelX: 10, labelY: 25 },
          { id: "2", x: 50, y: 50, labelX: 50, labelY: 30 },
          { id: "3", x: 50, y: 60, labelX: 50, labelY: 80 },
          { id: "4", x: 25, y: 60, labelX: 25, labelY: 80 },
          { id: "5", x: 17.5, y: 60, labelX: 10, labelY: 60 },
        ],
        legend: [
          { label: "1", description: "Vành lái" },
          { label: "2", description: "Bánh răng" },
          { label: "3", description: "Thanh răng" },
          { label: "4", description: "Các thanh đòn" },
          { label: "5", description: "Bánh xe dẫn hướng" },
        ],
      },
      {
        title: "Dẫn động lái và Trợ lực lái",
        paragraphs: [
          "Dẫn động lái: Bộ phận dẫn động lái truyền chuyển động quay từ vành lái đến cơ cấu lái và từ cơ cấu lái đến các bánh xe dẫn hướng.",
          "Trợ lực lái: Hệ thống trợ lực lái giảm lực cần tác dụng lên vành lái để điều khiển xe. Hệ thống trợ lực lái bằng điện đang được sử dụng nhiều trên ô tô con, nhưng hệ thống trợ lực lái bằng thuỷ lực vẫn phổ biến nhất.",
          "Các bộ phận chính của hệ thống trợ lực lái bằng thuỷ lực gồm: bơm trợ lực, cụm van phân phối, các đường ống dẫn dầu, pít tông trợ lực.",
        ],
        imageUrl: "diagram:power-steering",
        imageAlt: "Hệ thống trợ lực lái",
        imageMarkers: [
          { id: "1", x: 25, y: 62.5, labelX: 10, labelY: 62.5 },
          { id: "2", x: 38.75, y: 50, labelX: 25, labelY: 40 },
          { id: "3", x: 50, y: 27.5, labelX: 50, labelY: 10 },
          { id: "4", x: 56.25, y: 36.25, labelX: 75, labelY: 36.25 },
          { id: "5", x: 43.75, y: 47.5, labelX: 43.75, labelY: 65 },
          { id: "6", x: 50, y: 37.5, labelX: 65, labelY: 25 },
          { id: "7", x: 50, y: 47.5, labelX: 65, labelY: 60 },
        ],
        legend: [
          { label: "1", description: "Bơm dầu trợ lực" },
          { label: "2", description: "Ống dẫn dầu áp suất cao" },
          { label: "3", description: "Cụm van phân phối" },
          { label: "4", description: "Các ống dẫn dầu" },
          { label: "5", description: "Pít tông trợ lực" },
          { label: "6", description: "Bánh răng" },
          { label: "7", description: "Thanh răng" },
        ],
      },
    ],
    quiz: [
      {
        type: "multiple-choice",
        question: "Việc thắt dây an toàn khi ngồi trên ô tô có tác dụng gì?",
        options: [
          "Đối phó với cảnh sát giao thông.",
          "Giữ cơ thể cố định, giảm va đập khi xe dừng đột ngột hoặc xảy ra tai nạn.",
          "Làm cho ghế ngồi êm hơn.",
          "Giúp xe cân bằng hơn khi vào cua."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Tại sao ô tô cần phải được bảo dưỡng định kỳ theo khuyến cáo của nhà sản xuất?",
        options: [
          "Để nhà sản xuất có thêm lợi nhuận.",
          "Đảm bảo xe hoạt động ổn định, an toàn và duy trì các điều kiện bảo hành.",
          "Để xe có tiếng nổ to hơn.",
          "Để thay đổi màu sơn của xe."
        ],
        correctAnswer: 3,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hệ thống đèn chiếu sáng trên ô tô có tác dụng:",
        options: [
          "Giúp người lái quan sát đường vào ban đêm hoặc khi thiếu sáng.",
          "Báo hiệu sự hiện diện của xe cho các phương tiện khác.",
          "Trang trí thẩm mỹ cho xe.",
          "Cả A và B đều đúng."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Cơ cấu phanh đĩa có ưu điểm gì so với phanh tang trống?",
        options: [
          "Giá thành rẻ hơn.",
          "Thoát nhiệt tốt hơn, hiệu quả phanh cao và ổn định hơn.",
          "Cấu tạo kín nên không bị bụi bẩn.",
          "Không bao giờ bị mòn."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Khi mở cửa xe ô tô để bước xuống, người ngồi trên xe cần:",
        options: [
          "Mở tung cửa thật mạnh.",
          "Quan sát kỹ phía trước và phía sau, chỉ mở cửa khi đảm bảo an toàn.",
          "Mở cửa phía bên trái dù có xe đang lao tới.",
          "Nhảy xuống xe khi xe chưa dừng hẳn."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hệ thống âm thanh, điều hòa nhiệt độ trên ô tô thuộc hệ thống nào?",
        options: [
          "Hệ thống truyền lực.",
          "Hệ thống treo.",
          "Hệ thống điện và tiện nghi.",
          "Khung vỏ."
        ],
        correctAnswer: 0,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Li hợp (côn) thường được điều khiển bằng:",
        options: [
          "Bàn đạp chân (xe số sàn) hoặc tự động (xe số tự động).",
          "Cần số.",
          "Vô lăng.",
          "Công tắc trên táp lô."
        ],
        correctAnswer: 0,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Bánh xe dẫn hướng thường là bánh xe phía nào của ô tô?",
        options: [
          "Hai bánh phía trước.",
          "Hai bánh phía sau.",
          "Chỉ bánh bên trái.",
          "Tất cả các bánh xe."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Tác dụng của bộ phận giảm chấn (thụt) trong hệ thống treo là:",
        options: [
          "Nâng đỡ trọng lượng xe.",
          "Dập tắt nhanh các dao động của xe khi đi trên đường không bằng phẳng.",
          "Giúp bánh xe quay nhanh hơn.",
          "Thay đổi chiều cao của xe."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Xe ô tô đi bên phải theo chiều đi của mình là quy định của:",
        options: [
          "Nhà sản xuất ô tô.",
          "Luật Giao thông đường bộ tại Việt Nam.",
          "Hệ thống lái điện tử.",
          "Người ngồi trên xe."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      }
    ],
  },
  {
    id: "braking-safety",
    chapter: "Chương 7: Ô tô",
    title: "Braking System and Safety",
    titleVi: "Hệ thống phanh và an toàn",
    description:
      "Hệ thống phanh thủy lực, khí nén và các quy tắc an toàn giao thông.",
    xp: 70,
    icon: "Shield",
    content: [
      {
        title: "Hệ thống phanh thuỷ lực",
        paragraphs: [
          "Cấu tạo: Gồm hai phần là Các cơ cấu phanh (cơ cấu phanh trước, cơ cấu phanh sau) và Bộ phận dẫn động điều khiển phanh (bao gồm cụm xi lanh chính và các đường ống thuỷ lực).",
          "Cơ cấu phanh tạo ra mô-men phanh bánh xe thông qua ma sát giữa 2 nhóm chi tiết: chi tiết quay với bánh xe (đĩa phanh, trống phanh) và chi tiết cố định (má phanh). Có 2 loại cơ cấu phanh thông dụng: cơ cấu phanh đĩa và cơ cấu phanh tang trống.",
          "Nguyên lí hoạt động: Người lái tác dụng lực điều khiển lên bàn đạp phanh -> lực đẩy pít tông sơ cấp -> dịch chuyển dầu thuỷ lực trong khoang theo đường ống thuỷ lực đến các cơ cấu phanh.",
          "Xi lanh chính có 2 pít tông tạo 2 khoang dầu nối đến các cơ cấu phanh trên bánh xe nhất định -> tăng độ tin cậy và tính năng an toàn.",
          "Áp suất dầu trong xi lanh công tác -> áp lực đẩy pít tông và má phanh ép chặt vào đĩa phanh -> ma sát giữa đĩa phanh và các má phanh tạo ra mô men phanh bánh xe.",
        ],
        imageUrl: "diagram:hydraulic-brake",
        imageAlt:
          "Sơ đồ nguyên lí hệ thống phanh thuỷ lực dùng cơ cấu phanh đĩa",
        imageMarkers: [
          { id: "1", x: 21.25, y: 57.5, labelX: 10, labelY: 57.5 },
          { id: "2", x: 38.75, y: 45, labelX: 38.75, labelY: 25 },
          { id: "3", x: 33.75, y: 45, labelX: 33.75, labelY: 60 },
          { id: "4", x: 40, y: 45, labelX: 40, labelY: 60 },
          { id: "5", x: 54.375, y: 45, labelX: 54.375, labelY: 25 },
          { id: "6", x: 71.875, y: 62.5, labelX: 85, labelY: 62.5 },
          { id: "7", x: 70, y: 57.5, labelX: 85, labelY: 45 },
          { id: "8", x: 72.5, y: 62.5, labelX: 85, labelY: 80 },
          { id: "9", x: 35, y: 45, labelX: 35, labelY: 30 },
        ],
        legend: [
          { label: "1", description: "Bàn đạp phanh" },
          { label: "2", description: "Xi lanh chính" },
          { label: "3", description: "Pít tông sơ cấp" },
          { label: "4", description: "Pít tông thứ cấp" },
          { label: "5", description: "Các đường ống thuỷ lực" },
          { label: "6", description: "Xi lanh công tác" },
          { label: "7", description: "Pít tông xi lanh công tác" },
          { label: "8", description: "Má phanh" },
          { label: "9", description: "Đĩa phanh" },
        ],
      },
      {
        title: "Hệ thống phanh khí nén",
        paragraphs: [
          "Cấu tạo: Bao gồm các cơ cấu phanh và hệ thống dẫn động điều khiển. Các cơ cấu phanh bao gồm trống phanh, hai guốc phanh và cam ép. Hệ thống dẫn động phanh gồm máy nén khí, đường ống dẫn khí nén, bình chứa khí nén, van phân phối và bàn đạp phanh.",
          "Nguyên lí hoạt động: Máy nén khí đẩy khí nén qua đường ống đến bình chứa. Khi đạp bàn đạp phanh, van phân phối mở và khí nén đi đến cơ cấu phanh.",
          "Khí nén trong bầu phanh tạo áp lực làm quay cam ép, hai guốc phanh và ép vào trống phanh.",
        ],
        imageUrl: "diagram:pneumatic-brake",
        imageAlt: "Sơ đồ nguyên lí hệ thống phanh khí nén",
        imageMarkers: [
          { id: "1", x: 11.25, y: 47.5, labelX: 11.25, labelY: 25 },
          { id: "2", x: 20.625, y: 47.5, labelX: 20.625, labelY: 25 },
          { id: "3", x: 31.25, y: 47.5, labelX: 31.25, labelY: 25 },
          { id: "4", x: 55, y: 47.5, labelX: 55, labelY: 25 },
          { id: "5", x: 77.5, y: 62.5, labelX: 77.5, labelY: 80 },
          { id: "6", x: 84.375, y: 62.5, labelX: 84.375, labelY: 80 },
          { id: "7", x: 87.5, y: 62.5, labelX: 87.5, labelY: 80 },
          { id: "8", x: 90, y: 55, labelX: 90, labelY: 40 },
          { id: "9", x: 90.625, y: 55, labelX: 90.625, labelY: 20 },
          { id: "10", x: 90, y: 62.5, labelX: 90, labelY: 80 },
          { id: "11", x: 88.75, y: 45, labelX: 88.75, labelY: 25 },
          { id: "12", x: 51.25, y: 25, labelX: 51.25, labelY: 10 },
        ],
        legend: [
          { label: "1", description: "Máy nén khí" },
          { label: "2", description: "Các đường ống dẫn khí nén" },
          { label: "3", description: "Các bình chứa khí nén" },
          { label: "4", description: "Van phân phối" },
          { label: "5", description: "Bàn đạp phanh" },
          { label: "6", description: "Các cơ cấu phanh" },
          { label: "7", description: "Bầu phanh" },
          { label: "8", description: "Cam ép" },
          { label: "9", description: "Guốc phanh" },
          { label: "10", description: "Má phanh" },
          { label: "11", description: "Trống phanh" },
          { label: "12", description: "Chốt quay" },
        ],
      },
      {
        title: "An toàn khi tham gia giao thông",
        paragraphs: [
          "Người sử dụng, vận hành ô tô cần thực hiện đúng quy định về an toàn giao thông đường bộ, bao gồm:",
          "- Không lái xe khi có nồng độ cồn.",
          "- Thắt dây an toàn khi ngồi trên ô tô.",
          "- Đi đúng làn đường, phần đường quy định, và phải chấp hành hệ thống báo hiệu đường bộ.",
          "- Tuân thủ quy định về tốc độ xe chạy trên đường và giữ khoảng cách an toàn đối với xe liền trước.",
          "- Khuyến cáo đối với người ở trên xe: điều chỉnh ghế và ngồi đúng tư thế, quan sát trước và sau xe trước khi mở cửa, không mở cửa hoặc bước xuống xe khi chưa bảo đảm an toàn.",
        ],
      },
    ],
    quiz: [
      {
        type: "multiple-choice",
        question: "Hệ thống túi khí (Airbag) trên ô tô có nhiệm vụ:",
        options: [
          "Giúp xe nhẹ hơn khi lội nước.",
          "Giảm chấn thương cho người trong xe khi xảy ra va chạm mạnh.",
          "Làm mát khoang lái.",
          "Thay thế dây an toàn."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Khi đèn báo áp suất lốp trên bảng đồng hồ phát sáng, bạn nên:",
        options: [
          "Tiếp tục chạy bình thường.",
          "Dừng xe kiểm tra áp suất lốp vì có thể lốp bị non hơi hoặc thủng.",
          "Tăng tốc để nhanh đến chỗ sửa xe.",
          "Tắt đèn báo đi và chạy tiếp."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "\"Điểm mù\" của ô tô là:",
        options: [
          "Vị trí đèn pha không chiếu tới.",
          "Những khu vực xung quanh xe mà người lái không thể quan sát được qua gương hoặc trực tiếp.",
          "Lúc người lái nhắm mắt khi buồn ngủ.",
          "Phía dưới gầm xe."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hệ thống truyền lực \"Cầu sau\" có nghĩa là:",
        options: [
          "Động cơ đặt ở phía sau.",
          "Mô men từ động cơ được truyền đến các bánh xe phía sau để đẩy xe đi.",
          "Xe chỉ có bánh xe ở phía sau.",
          "Xe chỉ chạy lùi được."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Việc kiểm tra nồng độ cồn trước khi lái xe nhằm:",
        options: [
          "Tiết kiệm tiền mua rượu bia.",
          "Đảm bảo sự tỉnh táo của người lái, giảm nguy cơ gây tai nạn.",
          "Giúp động cơ nổ êm hơn.",
          "Theo yêu cầu của người ngồi sau."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Bộ phận nào sau đây không thuộc hệ thống lái?",
        options: [
          "Vô lăng.",
          "Thước lái.",
          "Bàn đạp phanh.",
          "Trục lái."
        ],
        correctAnswer: 2,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Hộp số tự động khác hộp số sàn ở chỗ:",
        options: [
          "Không có bánh răng.",
          "Tự động thay đổi tỷ số truyền dựa trên tốc độ và tải trọng mà không cần người lái cắt côn.",
          "Chạy tốn xăng hơn rất nhiều.",
          "Không thể chạy lùi."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Ý thức, trách nhiệm của người sử dụng ô tô thể hiện ở việc:",
        options: [
          "Chấp hành đúng luật giao thông.",
          "Bảo dưỡng xe định kỳ để giảm phát thải.",
          "Không lái xe khi đã uống rượu bia.",
          "Tất cả các ý trên."
        ],
        correctAnswer: 3,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Cấu tạo bánh xe ô tô gồm các phần chính:",
        options: [
          "Chỉ có lốp cao su.",
          "Vành bánh xe (mâm) và lốp xe.",
          "Trục xe và nan hoa.",
          "Đĩa phanh và má phanh."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      },
      {
        type: "multiple-choice",
        question: "Mục đích chính của việc học về cấu tạo và hệ thống ô tô là:",
        options: [
          "Để trở thành tay đua xe chuyên nghiệp.",
          "Hiểu nguyên lý, vận hành an toàn và biết cách bảo trì xe cơ bản.",
          "Để tự chế tạo một chiếc ô tô tại nhà.",
          "Để biết cách tháo rời xe ra bán linh kiện."
        ],
        correctAnswer: 1,
        explanation: "Theo kiến thức cơ bản về cấu tạo ô tô và động cơ đốt trong."
      }
    ],
  },
];
