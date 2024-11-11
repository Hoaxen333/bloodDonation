'use Client'
import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {useState} from 'react'

import { Flame } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EditDoadorProps {
  icon: React.ReactNode;
  doador: Doador,
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

const EditDoador:React.FC<EditDoadorProps> = ({ icon, doador,doadores,setDoadores }) => {
    const { toast } = useToast();
    const id = doador.id;
    const [nome,setNome] = useState<string>(doador.nome);
    const [bi,setBi] = useState<string>(doador.bi);
    const [nacionalidade,setNacionalidade] = useState<string>(doador.nacionalidade);
    const [date,setDate] = useState("");
    const [tipoSnaguineo,setTipoSanguineo] = useState<string>(doador.tipoSanguineo);
    const [disponibilidade,setDisponiblidade] = useState<boolean>(doador.disponibilidade);
    const [peso,setPeso] = useState<any>(doador.peso);

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
    const handleEdit = ()=>{
        const donator:Doador = {
            id:id,
            nome: nome,
            bi: bi,
            nacionalidade: nacionalidade,
            dataNascimento: date,
            tipoSanguineo: tipoSnaguineo,
            disponibilidade: disponibilidade,
            peso: peso
        }
        fetch("http://localhost:8080/api/doador",{
            method:'put',
            body:JSON.stringify(donator),
            headers:{
                'Content-type':'application/json',
                'Accept':'application/json'
            }
        }).then(retorno=>retorno.json())
        .then(retorno_convertido=>{
            if(retorno_convertido.mensagem !== undefined){
                
            }
            else{
                const doadoresAtualizados = doadores.map((d) =>
                    d.id === id ? { ...d, ...donator } : d
                  );
                  setDoadores(doadoresAtualizados);
                toast({
                    title: "Sucesso!",
                    description: "Registo editado com sucesso!",
                });
            }
        })

    console.log(doador);
    }
    const handleEditDisp = ()=>{
      const donator:Doador = {
          id:id,
          nome: nome,
          bi: bi,
          nacionalidade: nacionalidade,
          dataNascimento: date,
          tipoSanguineo: tipoSnaguineo,
          disponibilidade: !doador.disponibilidade,
          peso: peso
      }
      fetch("http://localhost:8080/api/doador",{
          method:'put',
          body:JSON.stringify(donator),
          headers:{
              'Content-type':'application/json',
              'Accept':'application/json'
          }
      }).then(retorno=>retorno.json())
      .then(retorno_convertido=>{
          if(retorno_convertido.mensagem !== undefined){
              
          }
          else{
              const doadoresAtualizados = doadores.map((d) =>
                  d.id === id ? { ...d, ...donator } : d
                );
                setDoadores(doadoresAtualizados);
              toast({
                  title: "Sucesso!",
                  description: "Registo editado com sucesso!",
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Doador</DialogTitle>
          <DialogDescription>
            Modifique aqui as informações dos doadores
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" value={nome} onChange={handleNomeChange}  className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bi" className="text-right">
              BI
            </Label>
            <Input id="bi" value={bi} onChange={handleBiChange}  className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nacionalidade" className="text-right">
              Nacionalidade
            </Label>
            <Input id="nacionalidade" value={nacionalidade} onChange={handleNacionalidadeChange}  className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dataNascimento" className="text-right">
              Data de Nascimento
            </Label>
            <Input id="dataNascimento" type='date' value={date} onChange={handleDateChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tipoSanguineo" className="text-right">
              Tipo Sanguineo
            </Label>
            <Input id="tipoSanguineo" value={tipoSnaguineo} onChange={handleTipoSanguineoChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="peso" className="text-right">
              Peso
            </Label>
            <Input id="peso" value={peso} onChange={handlePesoChange} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleEdit}>Editar</Button>
          <Button type="submit" onClick={handleEditDisp}>Editar Disp</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditDoador