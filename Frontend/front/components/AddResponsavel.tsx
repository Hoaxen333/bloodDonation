import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';

interface AddInventarioProps {
  icon: React.ReactNode;
  responsaveis: Responsavel[];
  setResponsaveis: React.Dispatch<React.SetStateAction<Responsavel[]>>;
}

interface Responsavel{
  id: any,
  nome: string,
  apelido: string,
  username: string,
  password: string,
  email: string,
  hospital: Hospital,
}
interface Hospital{
    id: any,
    nome: string,
    localizacao: string,
    contacto: string,
}

const AddInventario: React.FC<AddInventarioProps> = ({ icon, responsaveis, setResponsaveis }) => {
  const [idHospital, setIdHospital] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [apelido, setApelido] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleIdHospitalChange = (e: React.ChangeEvent<HTMLInputElement>) => setIdHospital(e.target.value);
  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value);
  const handleApelidoChange = (e: React.ChangeEvent<HTMLInputElement>) => setApelido(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  // Função para gerar username único com verificação no backend
  const generateUniqueUsername = async () => {
    let baseUsername = `${nome.toLowerCase()}.${apelido.toLowerCase()}`;
    let username = baseUsername;
    let counter = 1;

    while (true) {
      const response = await fetch(`http://localhost:8080/api/responsavel/verificar-username?username=${username}`);
      const data = await response.json();

      if (!data.exists) {
        return username; // Username disponível
      }

      // Se já existir, incrementa o sufixo
      username = `${baseUsername}${counter}`;
      counter++;
    }
  };

  // Função para gerar senha aleatória
  const generatePassword = () => {
    return Math.random().toString(36).slice(-8); // Gera uma senha aleatória de 8 caracteres
  };

  const handleSubmit = async () => {
    const hospital: Hospital = {
      id: idHospital,
      nome: "",
      localizacao: "",
      contacto: "",
    };

    const username = await generateUniqueUsername();
    const password = generatePassword();

    const responsavel: Responsavel = {
      id: null,
      nome,
      apelido,
      username,
      password,
      email,
      hospital,
    };

    fetch("http://localhost:8080/api/responsavel", {
      method: 'POST',
      body: JSON.stringify(responsavel),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao adicionar Responsavel.");
        }
        return response.json();
      })
      .then((data) => {
        setResponsaveis([...responsaveis, data]);
        toast({
          title: "Sucesso!",
          description: "Registro adicionado com sucesso!",
        });
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: "Falha!",
          description: "Erro ao adicionar o inventário!",
        });
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {icon}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Inventário</DialogTitle>
          <DialogDescription>
            Adicione aqui as informações do Inventário
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nome" className="text-right">Nome</Label>
            <Input
              id="nome"
              value={nome}
              onChange={handleNomeChange}
              placeholder="Nome do Responsavel"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apelido" className="text-right">Apelido</Label>
            <Input
              id="apelido"
              value={apelido}
              onChange={handleApelidoChange}
              placeholder="Apelido do Responsavel"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email do Responsavel"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id_h" className="text-right">Id Hospital</Label>
            <Input
              id="id_h"
              value={idHospital}
              onChange={handleIdHospitalChange}
              placeholder="ID do hospital"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddInventario;
