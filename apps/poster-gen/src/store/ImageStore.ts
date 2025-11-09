import { useLocalObservable } from "mobx-react";

interface ImageStore {
    image: File | null;
    addImage: (image: File) => void;
    hasImage: boolean;
}

const useImageStore = (): ImageStore => useLocalObservable<ImageStore>(() => ({
    image: null,
    
    addImage(image: File) {
        this.image = image;
    },
    
    get hasImage() {
        return this.image !== null;
    }
}));

export default useImageStore;