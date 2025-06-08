export const translateServerMessage = (msg: string) => {
  switch (msg) {
    case "Invalid email or password.":
      return ".بريد إلكتروني أو كلمة مرور غير صالحة";
    case "User already registered.":
      return "هذا البريد الالكتروني مستخدم بالفعل";
    default:
      return ".حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى";
  }
};
