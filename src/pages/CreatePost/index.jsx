import { Button } from "@mui/material";
import { useState } from "react";
import { Container, DivContent, SectionImages, SectionTexts } from "./styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api.js";
import MenuNav from "../../components/MenuNav";
import HeaderHome from "../../components/HeaderHome";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

const CreatePost = () => {
  const user = JSON.parse(localStorage.getItem("@CapstoneM3:userLogin"));

  const formSchema = yup.object().shape({
    text: yup
      .string()
      .min(2500, "Mínimo de 2500 caracteres!")
      .max(9000, "Máximo de 9000 caracteres!")
      .required("Texto Obrigatório!"),
    font: yup.string(),
    theme: yup.string(),
  });

  const [title, setTitle] = useState("Sem Título");
  const [primaryImage, setPrimaryImage] = useState("");
  const [secondaryImages, setSecondaryImages] = useState([]);

  const selectFirstImage = (evt) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      let newImage = reader.result;
      setPrimaryImage(newImage);
    });
    reader.readAsDataURL(evt.target.files[0]);
  };

  const selectOthersImages = (evt) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      let newImage = reader.result;
      setSecondaryImages([...secondaryImages, newImage]);
    });
    reader.readAsDataURL(evt.target.files[0]);
  };

  const cleanImages = () => {
    setPrimaryImage("");
    setSecondaryImages([]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const history = useHistory();

  const onSubmit = (data) => {
    const post = {
      title,
      text: data.text,
      font: data.font,
      theme: data.theme,
      date: `${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()} - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      primaryImage,
      secondaryImages,
      votes: [],
      media: null,
      userId: user.user.id,
    };
    api
      .post("/accept", post, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((resp) => {
        toast.success("Artigo enviado para revisão");
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <HeaderHome />
      <MenuNav hiddenSearch />

      <Container onSubmit={handleSubmit(onSubmit)}>
        <article>
          <h1 contentEditable onBlur={(evt) => setTitle(evt.target.innerText)}>
            Título...
          </h1>

          <SectionTexts>
            <div>
              <textarea
                placeholder="Conte sua história..."
                {...register("text")}
              />
              <span>{errors.text?.message}</span>
            </div>
          </SectionTexts>

          <DivContent>
            <label>
              Fonte: <span>*IMPORTANTE</span>
            </label>
            <input {...register("font")} />
          </DivContent>

          <DivContent>
            <label>
              Tema: <span>*IMPORTANTE</span>
            </label>
            <input {...register("theme")} />
          </DivContent>

          <SectionImages>
            <div>
              <h4>Selecione uma imagem principal.</h4>
              <label htmlFor="selecao-foto-principal">Selecionar imagem</label>
              <input
                type={"file"}
                id="selecao-foto-principal"
                accept="image/png, image/jpg"
                onChange={(evt) => selectFirstImage(evt)}
              />
              {primaryImage && <span>Imagem selecionada</span>}
            </div>

            <div>
              <h4>Selecione imagens secundárias</h4>
              <label htmlFor="selecao-fotos-secundárias">
                Selecionar imagem
              </label>
              <input
                type={"file"}
                id="selecao-fotos-secundárias"
                accept="image/png, image/jpg"
                onChange={(evt) => selectOthersImages(evt)}
              />
              <span>
                {secondaryImages.length > 1
                  ? `${secondaryImages.length} imagens foram selecionadas`
                  : secondaryImages.length === 1
                  ? `${secondaryImages.length} imagem foi selecionada`
                  : ""}
              </span>
            </div>

            <Button onClick={cleanImages}>Limpar imagens</Button>
          </SectionImages>

          <Button type="submit">Publicar</Button>
        </article>
      </Container>
    </>
  );
};

export default CreatePost;
