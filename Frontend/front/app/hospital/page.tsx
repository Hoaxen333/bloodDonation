'use client'
import React from 'react'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useState,useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { SquarePen,Trash,Check,Ban, SquarePlus, Icon} from 'lucide-react';
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import AddHospital from '@/components/AddHospital'
import EditHospital from '@/components/EditHospital'
const page = () => {
    interface Hospital{
        id: any,
        nome: string,
        localizacao: string,
        contacto:string
    }
    // UseState
    const [hospitais,setHospitais] = useState<Hospital[]>([]);

    //UseEffect
    useEffect(()=>{
        fetch(`http://localhost:8080/api/hospital`)
        .then(hospitais=>hospitais.json())
        .then(c_hospitais=>setHospitais(c_hospitais));
    },[]);

    //Delete
    const handleDelete = (id: number) => {
        fetch(`http://localhost:8080/api/hospital/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
          .then((retorno) => {
            if (!retorno.ok) {
              throw new Error(`Erro ao excluir: ${retorno.statusText}`);
            }
            // Verifica se a resposta tem conteúdo antes de chamar .json()
            return retorno.text().then(text => text ? JSON.parse(text) : {});
          })
          .then((retorno_convertido) => {
            if (retorno_convertido.mensagem !== undefined) {
              // Exibir mensagem de erro ou feedback ao usuário
              console.log(retorno_convertido.mensagem);
            } else {
                toast({
                    title: "Sucesso!",
                    description: "Registo Removido com sucesso!",
                });
                
              const novoHospitais = hospitais.filter((h) => h.id !== id);
              setHospitais(novoHospitais);
            }
          })
          .catch((error) => {
            toast({
                variant: "destructive",
                title: "Erro!",
                description: "Falha ao remover registo!",
            });
          });
      };
  return (
    <div>
        <SidebarProvider >
            <AppSidebar/>
            <main className='flex gap-1 p-2'>
                <SidebarTrigger />
                <div className='p-4 flex flex-col gap-10'>
                    <div className='flex items-center gap-2'>
                        <h2 className='font-bold text-4xl font-mono text-red-400'>Hospital</h2>
                        <Input className='h-[25px]'></Input>
                        <AddHospital icon={<SquarePlus className=' text-red-400 cursor-pointer' size={32}  />} hospitais={hospitais} setHospitais={setHospitais} />
                    </div>
                    
                    <div className='w-fit border-2 rounded-lg'>
                        <Table className='lg:w-[920px] '>
                            <TableCaption className=''>Lista dos Doadores</TableCaption>
                            <TableHeader>
                                <TableRow className='gap-2'>
                                    <TableHead className='text-center  text-red-400'>Id</TableHead>
                                    <TableHead className='text-center w-[200px] text-red-400'>Nome</TableHead>
                                    <TableHead className='text-center  text-red-400'>Localização</TableHead>
                                    <TableHead className='text-center  text-red-400'>Contacto</TableHead>
                                    <TableHead className='text-center '></TableHead>
                                    <TableHead className='text-center '></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {hospitais.map((hospital) => (
                                <TableRow key={hospital.id} className='gap-2'>
                                    <TableCell className="font-medium text-center bg-red-100">{hospital.id}</TableCell>
                                    <TableCell className='text-center w-[200px] text-xs bg-red-200'>{hospital.nome}</TableCell>
                                    <TableCell className='text-center text-xs bg-red-300'>{hospital.localizacao}</TableCell>
                                    <TableCell className='text-center w-[200px] text-xs bg-red-400'>{hospital.contacto}</TableCell>
                                    
                                    <TableCell><EditHospital icon={<SquarePen className='text-center text-blue-600 cursor-pointer' />} hospital={hospital} hospitais={hospitais} setHospitais={setHospitais}/></TableCell>
                                    <TableCell ><Trash className='text-center text-red-500 cursor-pointer' onClick={()=>handleDelete(hospital.id)} /></TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </main>
        </SidebarProvider>
    </div>
  )
}

export default page