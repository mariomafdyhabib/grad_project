import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function Cta() {
  return (
    <section className="container mb-8 flex items-center gap-8 text-center sm:text-right">
      <div className="hidden w-1/3 sm:block">
        <Image
          src="/images/home/cta.png"
          alt=""
          width={342}
          height={456}
          className="hidden w-full sm:block"
        />
      </div>
      <div>
        <h2 className="mb-2 text-2xl font-bold sm:text-4xl">
          أعلن عن وظيفة وقم بتعيين أفضل الحرفيين
        </h2>
        <p className="mb-8 text-muted-foreground">
          لا يجب أن يكون العثور على المواهب عملاً روتينيًا. أعلن عن وظيفة وفم
          بأختيار افضل الحرفيين
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className={buttonVariants({
              variant: "default",
              class: "bg-gradient text-white",
            })}
          >
            تسجيل الدخول
          </Link>
          <Link
            href="/register"
            className={buttonVariants({
              variant: "default",
              class: "bg-gradient text-white",
            })}
          >
            أنشاء حساب
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cta;
