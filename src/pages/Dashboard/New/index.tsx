import { Container } from "../../../components/container";
import { PanelHeader } from "../../../components/PanelHeader";
import { FaFileUpload } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { v4 as uuidV4 } from "uuid";
import { storage } from "../../../services/firebaseConnection";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { ImageProps } from "../../../interface/inputInterface";
import { FiTrash } from "react-icons/fi";

export function New() {
  const { user } = useContext(AuthContext);
  const [image, setImage] = useState<ImageProps[]>([]);

  const carSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    model: z.string().min(1, "O modelo é obrigatório"),
    km: z.number().nonnegative("KM deve ser um número não negativo"),
    year: z
      .number()
      .min(1886, "Ano inválido")
      .max(new Date().getFullYear(), "Ano inválido"),
    price: z.number().positive("O preço deve ser um valor positivo"),
    city: z.string().min(1, "A cidade é obrigatória"),
    phone: z.string().min(10, "Número de telefone inválido"),
    whatsapp: z.string().min(10, "Número de Whatsapp inválido"),
    description: z
      .string()
      .min(10, "A descrição deve ter pelo menos 10 caracteres"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(carSchema),
  });

  const onSubmit = (data: Object) => {
    console.log("Car data:", data);
  };

  /**
   * Handle delete image from list and delete from Firebase Storage
   * @param image the image to be deleted
   */
  async function handleDeleteImage(image: ImageProps) {
    const imagePath = ref(storage, `images/${image.uid}/${image.name}`);

    try {
      await deleteObject(imagePath);
      setImage((prevImages) => prevImages.filter((item) => item !== image));
    } catch {
      alert("Erro ao deletar imagem");
    }
  }

  /**
   * Handle image upload from input file
   * @param event the change event from input file
   */
  async function uploadFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      let image = event.target.files[0];

      if (
        image.type === "image/jpeg" ||
        image.type === "image/png" ||
        image.type === "image/jpg"
      ) {
        // send images to firebase
        await handleSendImage(image);
      } else {
        alert("Envie uma imagem do tipo PNG ou JPG");
      }
    }
  }

  async function handleSendImage(file: File) {
    if (!user?.uid) {
      return;
    }

    const userUuid = user?.uid;
    const uuidImage = uuidV4();

    const uploadRef = ref(storage, `images/${userUuid}/${uuidImage}`);
    uploadBytes(uploadRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const imageItem = {
            name: uuidImage,
            uid: userUuid,
            url: url,
            previewUrl: URL.createObjectURL(file),
          };

          setImage((prevImages) => [...prevImages, imageItem]);
          console.log(url);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Container>
      <PanelHeader />

      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center mt-4 gap-4">
        <button className="border-2 border-dashed  w-48 h-32 rounded-lg p-3 flex items-center justify-center cursor-pointer">
          <div className="absolute cursor-pointer">
            <FaFileUpload size={30} color="black" />
          </div>
          <div className="cursor-pointer">
            <input
              onChange={uploadFile}
              className="opacity-0 cursor-pointer"
              type="file"
              accept="image/*"
            />
          </div>
        </button>

        {image.map((image) => (
          <div
            key={image.name}
            className="w-full h-32 flex items-center justify-center relative "
          >
            <button
              onClick={() => {
                handleDeleteImage(image);
              }}
              className="absolute top-0 right-0 cursor-pointer p-2"
            >
              <FiTrash size={20} color="white" />
            </button>
            <img
              className="w-full rounded-lg h-32 object-cover"
              src={image.previewUrl}
              alt={image.name}
            />
          </div>
        ))}
      </div>

      <div className="bg-white w-full p-8 rounded-lg mt-3 mb-5 mx-auto shadow-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-gray-700 font-semibold">Nome</label>
            <input
              type="text"
              {...register("name")}
              className="w-full p-3 border rounded-lg mt-1"
            />
            {errors.name?.message && (
              <span className="text-red-500 text-sm">
                {String(errors.name.message)}
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Modelo</label>
            <input
              type="text"
              {...register("model")}
              className="w-full p-3 border rounded-lg mt-1"
            />
            {errors.model?.message && (
              <span className="text-red-500 text-sm">
                {String(errors.model.message)}
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              KM (Quilometros)
            </label>
            <input
              type="number"
              {...register("km", { valueAsNumber: true })}
              className="w-full p-3 border rounded-lg mt-1"
            />
            {errors.km?.message && (
              <span className="text-red-500 text-sm">
                {String(errors.km.message)}
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Ano</label>
            <input
              type="number"
              {...register("year", { valueAsNumber: true })}
              className="w-full p-3 border rounded-lg mt-1"
            />
            {errors.year?.message && (
              <span className="text-red-500 text-sm">
                {String(errors.year.message)}
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              Preço (R$)
            </label>
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="w-full p-3 border rounded-lg mt-1"
            />
            {errors.price?.message && (
              <span className="text-red-500 text-sm">
                {String(errors.price.message)}
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Cidade</label>
            <input
              type="text"
              {...register("city")}
              className="w-full p-3 border rounded-lg mt-1"
            />
            {errors.city?.message && (
              <span className="text-red-500 text-sm">
                {String(errors.city.message)}
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              Telefone
            </label>
            <input
              type="text"
              {...register("phone")}
              className="w-full p-3 border rounded-lg mt-1"
            />
            {errors.phone?.message && (
              <span className="text-red-500 text-sm">
                {String(errors.phone.message)}
              </span>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              Whatsapp
            </label>
            <input
              type="text"
              {...register("whatsapp")}
              className="w-full p-3 border rounded-lg mt-1"
            />
            {errors.whatsapp?.message && (
              <span className="text-red-500 text-sm">
                {String(errors.whatsapp.message)}
              </span>
            )}
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 font-semibold">
              Descrição
            </label>
            <textarea
              {...register("description")}
              className="w-full p-3 border rounded-lg mt-1"
              rows={4}
            ></textarea>
            {errors.description?.message && (
              <span className="text-red-500 text-sm">
                {String(errors.description.message)}
              </span>
            )}
          </div>

          <div className="col-span-2 flex justify-center mt-4">
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-800 transition font-semibold"
            >
              Cadastrar veículo
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}
