type Category = {
  id: string;
  name: string;
  imageUrl: string;
  descreption: string;
  rating: number;
  numberOfCraftsmen: number;
};

export const categories: Category[] = [
  {
    id: "1",
    name: "حياكة",
    imageUrl: "/images/home/knitting.png",
    descreption: "صناعة المنسوجات أو القماش عن طريق تشابك أو ربط حلقات الخيوط",
    rating: 4.8,
    numberOfCraftsmen: 220,
  },
  {
    id: "2",
    name: "النجار",
    imageUrl: "/images/home/carpenter.png",
    descreption:
      "النجارون هم محترفون ذوو مهارات عالية، يقومون بصياغة الهياكل وبنائها وتركيبها وإصلاحها.",
    rating: 4.8,
    numberOfCraftsmen: 1834,
  },
  {
    id: "3",
    name: "تطريز",
    imageUrl: "/images/home/embroidery.png",
    descreption:
      "فن تزيين مواد الديكور، وبشكل أساسي الأقمشة النسيجية، بواسطة الإبرة والخيط",
    rating: 4.8,
    numberOfCraftsmen: 1834,
  },
  {
    id: "4",
    name: "سباك",
    imageUrl: "/images/home/plumbing.png",
    descreption:
      "إصلاح الأنابيب والتركيبات التي تحمل الماء أو الغاز أو السوائل الأخرى في المنازل والشركات",
    rating: 4.8,
    numberOfCraftsmen: 1834,
  },
  {
    id: "5",
    name: "حداد",
    imageUrl: "/images/home/hammer.png",
    descreption: "سيقوم عامل اللحام بلحام المعدات والمرافق وصيانتها.",
    rating: 4.8,
    numberOfCraftsmen: 1834,
  },
  {
    id: "6",
    name: "اكسكسورات",
    imageUrl: "/images/home/bracelet.png",
    descreption: "هي عناصر زخرفية يتم ارتداؤها لتكملة أو تحسين مظهر الشخص.",
    rating: 4.8,
    numberOfCraftsmen: 1834,
  },
  {
    id: "7",
    name: "خزف",
    imageUrl: "/images/home/potter.png",
    descreption:
      "الخزف هو زينة مصنوعة من المواد غير العضوية، غير المعدنية، صلبة وهشة (بعد أن يوضع بالنار)",
    rating: 4.8,
    numberOfCraftsmen: 1834,
  },
  {
    id: "8",
    name: "أعمال النسيج",
    imageUrl: "/images/home/cloth.png",
    descreption:
      "أي قماش أو سلع يتم إنتاجها عن طريق النسيج أو الحياكة أو التلبيد",
    rating: 4.8,
    numberOfCraftsmen: 1834,
  },
];

export const jobCategories = [
  "محبوك",
  "نجارة",
  "تطريز",
  "سباكة",
  "صناعة المنسوجات",
  "لحام",
  "إكسسوارات",
  "خزف",
  "أعمال النسيج",
  "نقاشة",
  "أرضيات وسيراميك",
] as const;

export const jobDurations = [
  "أسبوع",
  "أسبوعين",
  "شهر",
  "شهرين",
  "ثلاثة اشهر",
  "أكثر من 6 أشهر",
];
