import { useSong } from "@Store";

export const StationSelector = () => {
  const { setSong, setToggledSong } = useSong();

  function setSongId(e: React.MouseEvent<HTMLInputElement>) {
    const target = e.target as Element;
    const id = target.id;
    setSong(id);
    songSelected(id);
  }

  function songSelected(id: string) {
    setToggledSong(id);
  }
  return (
    <div className="text-gray-800 dark:text-gray-200">
     
        

   
        
      </div>
   
  );
};
