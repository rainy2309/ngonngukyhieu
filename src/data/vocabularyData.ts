import { signDictionaryData, signCategories } from "@/data/signDictionaryData";
import type { Lesson, VocabularyItem } from "@/types/vocabulary";

export const signDataNote = "Dữ liệu ký hiệu minh họa trong bản demo cần được xác minh bởi nguồn chuyên môn.";

export const categories = signCategories;

export const vocabularyData: VocabularyItem[] = signDictionaryData.map((item) => ({
  id: item.id,
  word: item.word,
  meaning: item.meaning,
  category: item.category,
  exampleSentence: item.exampleSentence,
  imageDescription: item.description,
  signVideoPlaceholder: "GIF/Video minh họa ký hiệu. Nội dung minh họa sẽ được nhóm bổ sung hoặc xác minh ở giai đoạn sau.",
  difficulty: item.difficulty,
  relatedWords: item.relatedWords,
}));

export const lessons: Lesson[] = [
  {
    id: "chao-hoi-co-ban",
    topic: "Ký hiệu chào hỏi cơ bản",
    description: "Bắt đầu bằng các cách chào, cảm ơn, xin lỗi và hẹn gặp lại.",
    difficulty: "easy",
    wordIds: ["xin-chao", "chao", "tam-biet", "cam-on", "xin-loi", "hen-gap-lai"],
  },
  {
    id: "tu-vung-gia-dinh",
    topic: "Từ vựng gia đình",
    description: "Nhận biết người thân và các mối quan hệ gần gũi trong gia đình.",
    difficulty: "easy",
    wordIds: ["me", "ba", "anh", "chi", "em", "gia-dinh"],
  },
  {
    id: "cam-xuc-hang-ngay",
    topic: "Cảm xúc hằng ngày",
    description: "Diễn đạt cảm xúc rõ ràng qua từ, hình ảnh và ví dụ.",
    difficulty: "medium",
    wordIds: ["vui", "buon", "lo-lang", "so", "yeu-thuong", "uoc-mo"],
  },
  {
    id: "hanh-dong-thuong-gap",
    topic: "Hành động thường gặp",
    description: "Các động từ gần gũi trong sinh hoạt và học tập.",
    difficulty: "easy",
    wordIds: ["an", "uong", "di", "doc", "viet", "xem"],
  },
  {
    id: "thoi-gian-lich-trinh",
    topic: "Thời gian và lịch trình",
    description: "Nói về hôm nay, ngày mai và các thời điểm trong ngày.",
    difficulty: "medium",
    wordIds: ["hom-nay", "ngay-mai", "sang", "trua", "toi"],
  },
];
