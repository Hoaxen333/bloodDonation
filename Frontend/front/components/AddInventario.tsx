'use client'
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
  inventarios: Inventario[];
  setInventarios: React.Dispatch<React.SetStateAction<Inventario[]>>;
}

interface Inventario {
  id: any;
  a_mais: number;
  a_menos: number;
  b_mais: number;
  b_menos: number;
  ab_mais: number;
  ab_menos: number;
  o_mais: number;
  o_menos: number;
  hospital: Hospital;
}
interface Hospital{
    id:any,
    nome: string,
    localizacao: string,
    contacto:string,
}

const AddInventario: React.FC<AddInventarioProps> = ({ icon, inventarios, setInventarios }) => {
  const [idHospital, setIdHospital] = useState<string>("");
  
  const handleIdHospitalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdHospital(e.target.value);
  };
  
  const handleSubmit = () => {
    const hospital:Hospital = {
        id:idHospital,
        nome:"",
        localizacao:"",
        contacto:"",
    }
    const inventario: Inventario = {
      id: null,
      a_mais: 0,
      a_menos: 0,
      b_mais: 0,
      b_menos: 0,
      ab_mais: 0,
      ab_menos: 0,
      o_mais: 0,
      o_menos: 0,
      hospital:hospital
    };

    fetch("http://localhost:8080/api/inventario", {
      method: 'POST',
      body: JSON.stringify(inventario),
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
        setInventarios([...inventarios, data]);
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
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddInventario;
