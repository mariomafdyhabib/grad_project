import Image from "next/image";

function Hero() {
  return (
    <section className="container mt-20 flex flex-col-reverse gap-8 sm:flex-row">
      <div className="flex items-center justify-center sm:flex-1">
        <h1 className=" text-gradient max-w-[13ch] flex-1 p-1 text-center text-4xl font-bold leading-[1.2] lg:text-6xl">
          المستقبل يبدأ
          <br /> هنا
        </h1>
      </div>

      <div className="flex items-center justify-center sm:flex-1">
        <Image
          src="/images/home/hero.png"
          width={729}
          height={456}
          alt=""
          className="w-full max-w-[350px] object-cover sm:max-w-3xl"
        />
      </div>
    </section>
  );
}

export default Hero;
