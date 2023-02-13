export type ProfilePhotoProps = {
  name: string;
  photoUrl?: string;
  upload: (event: InputEvent) => void;
};
