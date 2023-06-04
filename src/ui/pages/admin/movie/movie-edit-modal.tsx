import Modal from "@/ui/components/ui/modal/modal";

export interface MovieEditModalProps {
  movieNum: number;
  onClose?: () => void;
}

export default function MovieEditModal({
  movieNum,
  onClose,
}: MovieEditModalProps) {
  return (
    <Modal onClose={onClose} sheetClass="container">
      <header className="border-b border-solid border-neutral-6 p-4">
        <h2>영화 정보 편집</h2>
      </header>
      <div className="container">werwer</div>
    </Modal>
  );
}
