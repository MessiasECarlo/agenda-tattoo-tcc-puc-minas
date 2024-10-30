import React, {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import { FiXCircle } from 'react-icons/fi';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import api from '@services/api';

import { useToast } from '@hooks/toast';

import Button from '@components/Button';
import Header from '@components/Header';
import Input from '@components/Input';
import Loading from '@components/Loading';

import getValidationErrors from '@utils/getValidationErrors';

import {
  Container,
  ContainerList,
  ContainerLoading,
  ContainerPost,
  Content,
  List,
  Select
} from './styles';

interface User {
  id: string;
  email: string;
}

interface Category {
  id: string;
  name: string;
}

interface RepositoryParams {
  slug: string;
}

interface SavePost {
  title: string;
  categories: string;
  content: string;
  user: string;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: {
    alternativeText: string;
    formats: {
      thumbnail: {
        url: string;
      };
    };
    url: string;
  };
  user: {
    name: string;
    email: string;
  };
}

const Blog: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const { params } = useRouteMatch<RepositoryParams>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  useEffect(() => {
    api.blog.get('/categories').then(response => setCategories(response.data));

    api.blog.get(`posts`).then(response => {
      const dataPosts = response.data;
      setPosts(dataPosts);
    });
    if (params.slug) {
      const newPost = posts.find(p => p.slug === params.slug);
      setPost(newPost);
    }
  }, [params]);

  const handleSubmit = useCallback(
    async (data: SavePost) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Preencha seu título!')
        });

        await schema.validate(data, {
          abortEarly: false
        });

        const newData = {
          ...data,
          categoryId
        };

        await api.blog.post('/posts', newData);

        history.push('/blog');

        addToast({
          type: 'success',
          title: 'Postagem salva',
          description: 'Sua postagem foi salva com sucesso!'
        });
        clearForm();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao salvar',
          description:
            'Ocorreu um erro ao salvar sua postagem, tente novamente!'
        });
      }
    },
    [addToast, history, categoryId]
  );

  const clearForm = useCallback(() => {
    formRef.current?.reset();
    setCategoryId(undefined);
  }, []);

  const handleDelete = useCallback(
    async id => {
      try {
        if (id) {
          await api.blog.delete(`posts/${id}`);

          addToast({
            type: 'success',
            title: 'Postagem deletada',
            description: 'Sua postagem foi deletada com sucesso!'
          });

          history.push('/blog');
        }
      } catch (error) {
        console.error(error);

        addToast({
          type: 'error',
          title: 'Erro ao deletar',
          description:
            'Ocorreu um erro ao deletar sua postagem, tente novamente!'
        });
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <Header />
      <h1>Blog</h1>
      <ContainerPost>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="title" placeholder="Título" maxLength={200} />

          <Select
            name="categoryId"
            className={categoryId ? 'selected' : ''}
            onChange={e => setCategoryId(e.target.value)}
          >
            <option value="">Selecione uma categoria</option>
            {Children.toArray(
              categories?.map(({ id, name }: Category) => (
                <option value={id}>{name}</option>
              ))
            )}
          </Select>

          <Input name="content" placeholder="Conteúdo" maxLength={200} />
          <Button type="submit">Salvar</Button>
        </Form>
      </ContainerPost>

      {posts ? (
        <>
          <Content>
            {Children.toArray(
              posts?.map(({ title, content, user: { name } }: Post) => {
                return (
                  <ContainerList>
                    <List to="/blog">
                      <h3>{title}</h3>
                      <small>{`por: ${name}`}</small>
                      <p>{content}</p>
                    </List>
                    {/* {UserLogged?.email === email && (
                        <div
                          onClick={() => handleDelete(id)}
                          aria-hidden="true"
                        >
                          <FiTrash2 size={20} />
                          Excluir sua postagem
                        </div>
                      )} */}
                  </ContainerList>
                );
              })
            )}
          </Content>
          {post && (
            <ContainerPost>
              <div>
                <FiXCircle
                  size={20}
                  onClick={() => {
                    history.push('/blog');
                    setPost(undefined);
                  }}
                />
                Fechar
              </div>
              <h2>{post.title}</h2>
              <small>{`por: ${post.user.name}`}</small>
              <p>{post.content}</p>
            </ContainerPost>
          )}
        </>
      ) : (
        <ContainerLoading>
          <Loading />
          Carregando
        </ContainerLoading>
      )}
    </Container>
  );
};

export default Blog;
