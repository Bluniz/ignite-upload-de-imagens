import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        alignSelf="center"
        display="flex"
        alignItems="center"
        mw={900}
        mh={600}
      >
        <ModalBody p={0}>
          <Image src={imgUrl} alt="imagem" borderTopRadius="md" />
        </ModalBody>
        <ModalFooter bgColor="pGray.800" w="100%" justifyContent="flex-start">
          <Link href={imgUrl} target="_blank">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
