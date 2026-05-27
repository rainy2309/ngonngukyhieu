export type AlphabetSignItem = {
  id: string;
  letter: string;
  title: string;
  description: string;
  difficulty: "basic";
  category: "Bảng chữ cái";
  videoPlaceholder: string;
  gifPlaceholder: string;
  instructions: string[];
  tips: string[];
};

const baseInstructions = [
  "Quan sát video/GIF minh họa khi nhóm bổ sung dữ liệu.",
  "Giữ bàn tay trong khung nhìn rõ ràng.",
  "Thực hiện chậm để người đối diện dễ quan sát.",
  "Lặp lại ký hiệu 3-5 lần để ghi nhớ.",
];

const baseTips = [
  "Không thực hiện quá nhanh khi mới học.",
  "Đảm bảo ánh sáng đủ rõ khi xem hoặc quay ký hiệu.",
  "Ký hiệu minh họa trong bản demo cần được xác minh bởi nguồn chuyên môn.",
];

const letters = [
  ["a", "A"],
  ["aw", "Ă"],
  ["aa", "Â"],
  ["b", "B"],
  ["c", "C"],
  ["d", "D"],
  ["dd", "Đ"],
  ["e", "E"],
  ["ee", "Ê"],
  ["g", "G"],
  ["h", "H"],
  ["i", "I"],
  ["k", "K"],
  ["l", "L"],
  ["m", "M"],
  ["n", "N"],
  ["o", "O"],
  ["oo", "Ô"],
  ["ow", "Ơ"],
  ["p", "P"],
  ["q", "Q"],
  ["r", "R"],
  ["s", "S"],
  ["t", "T"],
  ["u", "U"],
  ["uw", "Ư"],
  ["v", "V"],
  ["x", "X"],
  ["y", "Y"],
] as const;

export const alphabetSignData: AlphabetSignItem[] = letters.map(([id, letter]) => ({
  id,
  letter,
  title: `Ký hiệu chữ ${letter}`,
  description: `Chữ ${letter} là ký hiệu nền tảng trong bảng chữ cái. Hãy luyện nhận diện chữ trước khi chuyển sang phần ghép từ.`,
  difficulty: "basic",
  category: "Bảng chữ cái",
  videoPlaceholder: `GIF/Video minh họa ký hiệu chữ ${letter}`,
  gifPlaceholder: `Placeholder GIF chữ ${letter}`,
  instructions: baseInstructions,
  tips: baseTips,
}));
