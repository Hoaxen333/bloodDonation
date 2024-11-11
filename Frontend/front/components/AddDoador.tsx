'use Client'
import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {useState} from 'react'

import { toast } from '@/hooks/use-toast';

interface AddDoadorProps {
  icon: React.ReactNode;
  doadores: Doador[],
  setDoadores: React.Dispatch<React.SetStateAction<Doador[]>>;
}
interface Doador{
    id:any,
    nome: string,
    bi: string,
    nacionalidade:string
    dataNascimento: string,
    tipoSanguineo: string,
    disponibilidade: boolean
    peso: number
}

const AddDoador: React.FC<AddDoadorProps> = ({ icon, doadores,setDoadores }) => {
    
    const [nome,setNome] = useState<string>("");
    const [bi,setBi] = useState<string>("");
    const [nacionalidade,setNacionalidade] = useState<string>("");
    const [date,setDate] = useState("");
    const [tipoSnaguineo,setTipoSanguineo] = useState<string>("");
    const [disponiblidade,setDisponiblidade] = useState<boolean>(true);
    const [peso,setPeso] = useState<any>(50);

    const handleNomeChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setNome(e.target.value);
    }
    const handleBiChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setBi(e.target.value);
    }
    const handleNacionalidadeChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setNacionalidade(e.target.value);
    }
    const handleDateChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setDate(e.target.value);
    }
    const handleTipoSanguineoChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setTipoSanguineo(e.target.value);
    }
    const handlePesoChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setPeso(e.target.value);
    }

    const handleSubmit = ()=>{
        const doador:Doador = {
            id:null,
            nome: nome,
            bi: bi,
            nacionalidade: nacionalidade,
            dataNascimento: date,
            tipoSanguineo: tipoSnaguineo,
            disponibilidade: true,
            peso: peso
        }
        fetch("http://localhost:8080/api/doador",{
            method:'post',
            body:JSON.stringify(doador),
            headers:{
                'Content-type':'application/json',
                'Accept':'application/json'
            }
        }).then(retorno=>retorno.json())
        .then(retorno_convertido=>{
            if(retorno_convertido.mensagem !== undefined){

            }
            else{
                setDoadores([...doadores,retorno_convertido]);
                toast({
                    title: "Sucesso!",
                    description: "Registo adicionado com sucesso!",
                });
            }
        })

    console.log(doador);
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
          {icon}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Adicionar Doador</DialogTitle>
          <DialogDescription>
            Adicione aqui as informações dos doadores
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-xs">
              Nome
            </Label>
            <Input id="name" value={nome} onChange={handleNomeChange}  className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bi" className="text-right text-xs">
              BI
            </Label>
            <Input id="bi" value={bi} onChange={handleBiChange}  className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nacionalidade" className="text-right text-xs">
              Nacionalidade
            </Label>
            <Input id="nacionalidade" value={nacionalidade} onChange={handleNacionalidadeChange}  className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dataNascimento" className="text-right text-xs">
              Data de Nascimento
            </Label>
            <Input id="dataNascimento" type='date' value={date} onChange={handleDateChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tipoSanguineo" className="text-right text-xs">
              Tipo Sanguineo
            </Label>
            <Input id="tipoSanguineo" value={tipoSnaguineo} onChange={handleTipoSanguineoChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="peso" className="text-right text-xs">
              Peso
            </Label>
            <Input id="peso" value={peso} onChange={handlePesoChange} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddDoador;
