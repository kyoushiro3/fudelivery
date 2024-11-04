import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

interface RemoveBtnProps {
  id: string | any;
}

export default function RemoveBtn({ id }: RemoveBtnProps) {
  const router = useRouter();

  const remove = async () => {
    const res = await fetch(`http://localhost:3000/api/foods?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh(); //use to refresh the page if we delete
    } else {
      console.error("Failed to delete");
    }
  };

  return (
    <button onClick={remove}>
      <MdDelete size={24} />
    </button>
  );
}
