import React, { useState, FormEvent } from "react";
import { FiChevronRight } from "react-icons/fi";
import api from "../../services/api";

import logoImg from "../../assets/logo.svg";

import { Title, Form, Repositories } from "./styles";

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  map: (repository: any) => {};
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [repositories, setRepositories] = useState<Repository | null>();

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    const response = await api.get<Repository>(`orgs/${newRepo}/repos`);

    const repositories = response.data;

    setRepositories(repositories);
    setNewRepo("");
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Explore repositórios no Github</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        {repositories &&
          repositories.map((repository: any) => (
            <>
              {repository && (
                <a key={repository.full_name} href="#top">
                  <img
                    src={repository.owner && repository.owner.avatar_url}
                    alt={repository.owner && repository.owner.login}
                  />
                  <div>
                    <strong>{repository.full_name}</strong>
                    <p>{repository.description}</p>
                  </div>

                  <FiChevronRight size={20} />
                </a>
              )}
            </>
          ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
