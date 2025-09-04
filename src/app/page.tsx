import prisma from "@/lib/db";

const Page = async () => {
  const posts = await prisma.post.findMany();

  return (
    <div className="p-4">
      {JSON.stringify(posts)}      
    </div>
  );
};

export default Page;
