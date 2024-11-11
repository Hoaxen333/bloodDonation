'use Client'
import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {useState} from 'react'

import { toast } from '@/hooks/use-toast';

interface AddDoadorProps {
  icon: React.ReactNode,
  hospital:Hospital,
  hospitais: Hospital[],
  setHospitais: React.Dispatch<React.SetStateAction<Hospital[]>>;
}
interface Hospital{
    id:any,
    nome: string,
    localizacao: string,
    contacto:string,
}
const EditHospital: React.FC<AddDoadorProps> = ({ icon, hospital, hospitais, setHospitais }) => {
    const id = hospital.id;
    const [nome,setNome] = useState<string>(hospital.nome);
    const [localizacao,setLocalizacao] = useState<string>(hospital.localizacao);
    const [contacto,setContacto] = useState<string>(hospital.contacto);
    

    const handleNomeChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setNome(e.target.value);
    }
    const handlLocalizacaoChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setLocalizacao(e.target.value);
    }
    const handleContactoChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setContacto(e.target.value);
    }

    const handleSubmit = ()=>{
        const hospital:Hospital = {
            id:id,
            nome: nome,
            localizacao: localizacao,
            contacto: contacto,
        }
        fetch("http://localhost:8080/api/hospital",{
            method:'put',
            body:JSON.stringify(hospital),
            headers:{
                'Content-type':'application/json',
                'Accept':'application/json'
            }
        }).then(retorno=>retorno.json())
        .then(retorno_convertido=>{
            if(retorno_convertido.mensagem !== undefined){
                toast({
                    variant:'destructive',
                    title: "Erro!",
                    description: "Erro ao editar!",
                });
            }
            else{
                const doadoresAtualizados = hospitais.map((h) =>
                    h.id === id ? { ...h, ...hospital } : h
                  );
                  setHospitais(doadoresAtualizados);
                toast({
                    title: "Sucesso!",
                    description: "Registo editado com sucesso!",
                });
            }
        })

    console.log(hospital);
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
          {icon}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Hospital</DialogTitle>
          <DialogDescription>
            Edite aqui as informações dos Hospitais
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
            <Label htmlFor="localizacao" className="text-right">
              Localizacao
            </Label>
            <Input id="localizacao" value={localizacao} onChange={handlLocalizacaoChange}  className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contacto" className="text-right">
              Contacto
            </Label>
            <Input id="contacto" value={contacto} onChange={handleContactoChange}  className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Editar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditHospital