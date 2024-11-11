'use Client'
import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {useState} from 'react'
import { toast } from '@/hooks/use-toast';

interface AddHospitalProps {
  icon: React.ReactNode;
  hospitais: Hospital[],
  setHospitais: React.Dispatch<React.SetStateAction<Hospital[]>>;
}
interface Hospital{
    id:any,
    nome: string,
    localizacao: string,
    contacto:string,
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
const AddHospital: React.FC<AddHospitalProps> = ({ icon, hospitais,setHospitais }) => {
    const [nome,setNome] = useState<string>("");
    const [localizacao,setLocalizacao] = useState<string>("");
    const [contacto,setContacto] = useState<string>("");
    

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
            id:null,
            nome: nome,
            localizacao: localizacao,
            contacto: contacto,
        }
        fetch("http://localhost:8080/api/hospital",{
            method:'post',
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
                    title: "Falha!",
                    description: "Falha ao adicionar Hospital!",
                });
            }
            else{
                setHospitais([...hospitais,retorno_convertido]);
                const hospital:Hospital = {
                  id:retorno_convertido.id,
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
                    toast({
                      title: "Sucesso!",
                      description: "Registro adicionado com sucesso!",
                    });
                  })
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
          <DialogTitle>Adicionar Hospital</DialogTitle>
          <DialogDescription>
            Adicione aqui as informações dos Hospitais
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
          <Button type="submit" onClick={handleSubmit}>Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddHospital