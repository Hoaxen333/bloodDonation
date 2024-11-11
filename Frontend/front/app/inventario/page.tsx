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
import AddInventario from '@/components/AddInventario'


interface Hospital{
    id:any,
    nome: string,
    localizacao: string,
    contacto:string,
}
interface Inventario{
    id: any,
    a_mais: number,
    a_menos: number,
    b_mais: number,
    b_menos: number,
    ab_mais: number,
    ab_menos: number,
    o_mais: number,
    o_menos: number,
    hospital:Hospital
}
const page = () => {
    
    // UseState
    const [inventarios,setInventarios] = useState<Inventario[]>([]);

    //UseEffect
    useEffect(()=>{
        fetch(`http://localhost:8080/api/inventario`)
        .then(inventarios=>inventarios.json())
        .then(c_inventarios=>setInventarios(c_inventarios));
    },[]);

    //Delete
    const handleDelete = (id: number) => {
        fetch(`http://localhost:8080/api/inventario/${id}`, {
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
                
              const novoInventario = inventarios.filter((i) => i.id !== id);
              setInventarios(novoInventario);
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
                <div className='p-4 flex flex-col items-center gap-10 '>
                    <div className='flex items-center gap-2'>
                        <h2 className='font-bold text-4xl font-mono text-red-400'>Inventário</h2>
                    </div>
                    
                    <div className='w-fit border-2 rounded-lg'>
                        <Table className='lg:w-[950px] text-xl '>
                            <TableCaption className=''>Lista dos Inventário</TableCaption>
                            <TableHeader>
                                <TableRow className='gap-2'>
                                    <TableHead className='text-center  text-red-400 '>Id</TableHead>
                                    <TableHead className='text-center  text-red-400'>A+</TableHead>
                                    <TableHead className='text-center  text-red-400'>A-</TableHead>
                                    <TableHead className='text-center  text-red-400'>B+</TableHead>
                                    <TableHead className='text-center  text-red-400'>B-</TableHead>
                                    <TableHead className='text-center  text-red-400'>AB+</TableHead>
                                    <TableHead className='text-center  text-red-400'>AB-</TableHead>
                                    <TableHead className='text-center  text-red-400'>O+</TableHead>
                                    <TableHead className='text-center  text-red-400'>O-</TableHead>
                                    <TableHead className='text-center text-xs  text-red-400'>Nome Hospital</TableHead>
                                    
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inventarios.map((inventario) => (
                                <TableRow key={inventario.id} className='gap-2'>
                                    <TableCell className="font-medium text-center bg-red-100 text-xs text-red-950">{inventario.id}</TableCell>
                                    <TableCell className='text-center  text-xs bg-red-200'>{inventario.a_mais}</TableCell>
                                    <TableCell className='text-center text-xs bg-red-300'>{inventario.a_menos}</TableCell>
                                    <TableCell className='text-center  text-xs bg-red-400'>{inventario.b_mais}</TableCell>
                                    <TableCell className='text-center  text-xs bg-red-500'>{inventario.b_menos}</TableCell>
                                    <TableCell className='text-center  text-xs bg-red-600 text-white'>{inventario.ab_mais}</TableCell>
                                    <TableCell className='text-center text-xs bg-red-700 text-white'>{inventario.ab_menos}</TableCell>
                                    <TableCell className='text-center  text-xs bg-red-800 text-white'>{inventario.o_mais}</TableCell>
                                    <TableCell className='text-center  text-xs bg-red-900 text-white'>{inventario.o_menos}</TableCell>
                                    <TableCell className='text-center  text-xs '>{inventario.hospital.nome}</TableCell>
                                    
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