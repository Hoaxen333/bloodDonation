'use Client'
import React from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {useState} from 'react'

import { toast } from '@/hooks/use-toast';
interface AddDoacaoProps {
    icon: React.ReactNode;
    doacoes: Doacao[],
    setDoacoes: React.Dispatch<React.SetStateAction<Doacao[]>>;
  }
interface Doador{
    id: any,
    nome: string,
    bi: string,
    nacionalidade:string
    date: string,
    tipoSanguineo: string,
    disponiblidade: boolean
    peso: number
}
interface Hospital{
    id: any,
    nome: string,
    localizacao: string,
    contacto:string
}
interface Doacao{
    id: any,
    date:any,
    doador:Doador,
    hospital:Hospital,
}
const AddDoacao: React.FC<AddDoacaoProps> = ({ icon, doacoes,setDoacoes }) => {
    const [idHospital, setIdHospital] = useState<string>("");
    const [idDoador, setIdDoador] = useState<string>("");
  const handleIdHospitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdHospital(e.target.value);
  };
  const handleIdDoadorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdDoador(e.target.value);
  };
  
  const handleSubmit = () => {
    const hospital:Hospital = {
        id:idHospital,
        nome:"",
        localizacao:"",
        contacto:"",
    };
    const doador: Doador = {
      id: idDoador,
      nome: "",
      bi: "",
      nacionalidade: "",
      date: "",
      tipoSanguineo: "",
      disponiblidade: true,
      peso: 50
    };
    const doacao:Doacao = {
        id: null,
        date: null,
        doador:doador,
        hospital:hospital,
    }
    fetch("http://localhost:8080/api/doacao", {
      method: 'POST',
      body: JSON.stringify(doacao),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao adicionar inventário.");
        }
        return response.json();
      })
      .then((data) => {
        setDoacoes([...doacoes, data]);
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
          <DialogTitle>Adicionar Doação</DialogTitle>
          <DialogDescription>
            Adicione aqui as informações necessárias
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id_h" className="text-right">
              Id Hospital
            </Label>
            <Input
              id="id_h"
              value={idHospital}
              onChange={handleIdHospitalChange}
              placeholder="ID do hospital"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id_h" className="text-right">
              Id Doador
            </Label>
            <Input
              id="id_h"
              value={idDoador}
              onChange={handleIdDoadorChange}
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
  )
}

export default AddDoacao