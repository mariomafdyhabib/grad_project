import { categories } from "@/lib/placehoder-data";
import Image from "next/image";

function Categories() {
  return (
    <section className="container flex flex-col items-center gap-8">
      <h2 className="text-center text-2xl font-bold sm:text-4xl">
        تصفح المواهب حسب الفئة
      </h2>
      <div className=" grid w-full max-w-screen-lg grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
        {categories.map((category, i) => (
          <div
            key={category.id}
            className={`flex flex-col items-center rounded-md border-border p-4 shadow-lg ${i === 0 ? "bg-gradient text-white" : "bg-white"} `}
          >
            <div
              className={`mb-4 flex h-[6.25rem] w-[6.25rem] items-center justify-center rounded-full ${i === 0 ? "bg-white" : "bg-gradient"} `}
            >
              <Image
                src={category.imageUrl}
                alt=""
                width={73}
                height={73}
                className="h-16 w-16 "
              />
            </div>
            <h3 className="typography-h3 mb-4">{category.name}</h3>
            <span className="text-center">{category.descreption}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
