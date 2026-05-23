import { CalendarDays, Camera, ChartNoAxesColumn, HeartHandshake, PlaySquare, Share2, Sparkles } from "lucide-react";

export const campaignCards = [
  { title: "Video ngắn về cuộc sống người khiếm thính", description: "Một câu chuyện đời thường, tích cực và chân thật.", icon: PlaySquare },
  { title: "Infographic: cách giao tiếp lịch sự", description: "Các nguyên tắc dễ nhớ khi trò chuyện.", icon: ChartNoAxesColumn },
  { title: "Mini challenge: giao tiếp không dùng giọng nói trong 10 phút", description: "Hoạt động trải nghiệm ngắn cho lớp học.", icon: Sparkles },
  { title: "Mỗi ngày một ký hiệu cơ bản", description: "Chuỗi bài đăng ngắn, dễ lưu và chia sẻ.", icon: HeartHandshake },
  { title: "Câu chuyện truyền cảm hứng", description: "Tôn vinh nỗ lực học tập và kết nối.", icon: Share2 },
];

export const platforms = [
  { name: "Facebook", icon: Share2 },
  { name: "TikTok", icon: PlaySquare },
  { name: "Instagram", icon: Camera },
];

export const campaignCalendar = [
  { day: "Ngày 1", topic: "Giới thiệu dự án", icon: CalendarDays },
  { day: "Ngày 2", topic: "Một khó khăn thường gặp", icon: CalendarDays },
  { day: "Ngày 3", topic: "Một ký hiệu cơ bản", icon: CalendarDays },
  { day: "Ngày 4", topic: "Mini challenge", icon: CalendarDays },
  { day: "Ngày 5", topic: "Infographic", icon: CalendarDays },
  { day: "Ngày 6", topic: "Quiz cộng đồng", icon: CalendarDays },
  { day: "Ngày 7", topic: "Tổng kết và kêu gọi chia sẻ", icon: CalendarDays },
];
