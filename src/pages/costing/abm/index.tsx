import DynamicInputs from "@/components/dymamicInputs";
import Navigation from "@/components/navBar";
import {
  Button, Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from 'react';
const MethodAbm = () => {
  const [unidadesProducidas, setUnidadesProducidas] = useState(0);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>({});
  const [fixedOne, setfixedOne] = useState(0);
  const [fixedTwo, setfixedTwo] = useState(0);
  const [costs, setCosts] = useState([{ activity: "", variableCost: 0 }]);
  const handleOpen = () => setOpen(!open);

  const calcularCostos = () => {
    const costosTotales: any = [];
    let costoTotalPorUnidad = 0;

    costs.forEach((item) => {
      const unityVariableCost = item.variableCost / unidadesProducidas;
      const costoTotal = parseFloat(fixedOne as any) + parseFloat(fixedTwo as any) + (unityVariableCost * unidadesProducidas);
      costosTotales.push({ actividad: item.activity, costo: costoTotal });
      costoTotalPorUnidad += costoTotal;
    });

    const costosUnitarios = costosTotales.map((item: any) => ({
      actividad: item.actividad,
      costo: item.costo / unidadesProducidas
    }));
    const costoNoAgregado = costs.reduce((accumulator, object) => {
      return accumulator + parseFloat(object?.variableCost as any);
    }, 0);
    const costoAgregado = costoTotalPorUnidad - costoNoAgregado;
    const porcentajeCostoAgregado = (costoAgregado / costoTotalPorUnidad) * 100;
    costosTotales.forEach((item: any) => {
      console.log(item.actividad + ": " + item.costo);
    });

    costosUnitarios.forEach((item: any) => {
      console.log(item.actividad + ": " + item.costo);
    });
    setData({ costosTotales, costosUnitarios,  costoTotalPorUnidad, costoAgregado, porcentajeCostoAgregado: Number.parseFloat(porcentajeCostoAgregado as any).toFixed(2)});
    setOpen(true);
  };
  const handleInputChange = (event: any) => {
    setUnidadesProducidas(parseInt(event.target.value));
  };
  return (
    <div className="min-h-screen w-full bg-gray-100 text-black">
      <Navigation />
      <div className="container flex flex-col justify-center pt-10">
        <span className="text-center font-bold text-2xl w-full">Modelo ABM</span>
        <p className="text-justify text-lg pt-5">
          Activity-Based Management o ABM es una técnica de gestión dedicada a buscar la reducción
          de los costos a través de la eficiencia en las operaciones. La esencia de ABM es gestionar
          todas las actividades de la compañía utilizando como información la provista por ABC, cuyo
          objetivo es la mejora continua.
        </p>
      </div>
      <div className='flex flex-col justify-center gap-4 pt-10 container'>
        <DynamicInputs users={costs} setUsers={setCosts} />
        <div className='w-1/2'>
          <Input
            type="number"
            color="orange"
            label='costo fijo 1'
            value={fixedOne}
            onChange={(e: any) => setfixedOne(e?.target?.value)}
          />
        </div>
        <div className='w-1/2'>
          <Input
            type="number"
            color="orange"
            label='costo fijo 2'
            value={fixedTwo}
            onChange={(e: any) => setfixedTwo(e?.target?.value)}
          />
        </div>
        <div className='w-1/2'>
          <Input
            type="number"
            color="orange"
            label='Unidades producidas'
            value={unidadesProducidas}
            onChange={handleInputChange}
          />
        </div>
        <Button onClick={calcularCostos} color="orange" disabled={!unidadesProducidas}>Calcular</Button>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Resultados</DialogHeader>
        <DialogBody divider id='modalBody' className='flex flex-col'>
          <span className='font-bold text-lg'>Costos totales por actividad:</span>
          <div className='flex flex-col gap-3'>
            {
              data?.costosTotales?.map((item: any, index: number) => (
                <span key={`item-${index + 1}`}>{`${item.actividad}: ${item.costo}`}</span>
              ))
            }
          </div>
          <span className='font-bold text-lg py-2'>{`Costo total por unidad producida: ${data?.costoTotalPorUnidad}`}</span>
          <span className='font-bold text-lg py-2'>Costos unitarios por actividad:</span>
          <div className='flex flex-col gap-3'>
            {
              data?.costosUnitarios?.map((item: any, index: number) => (
                <span key={`item-${index + 1}`}>{`${item.actividad}: ${item.costo}`}</span>
              ))
            }
          </div>
          <span className='font-bold text-lg py-2'>{`El costo total agregado es: ${data?.costoAgregado}`}</span>
          <span className='font-bold text-lg py-2'>{`El porcentaje del costo total agregado es: : ${data?.porcentajeCostoAgregado}%`}</span>
        </DialogBody>
        <DialogFooter className='gap-3 flex justify-center'>
          <Button variant="gradient" color="orange" onClick={() => {
            handleOpen();
          }}>
            <span>Cerrar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default MethodAbm;