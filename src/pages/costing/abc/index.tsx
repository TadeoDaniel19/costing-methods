import { useState } from 'react';
import Navigation from "@/components/navBar";
import {
  Button, Input, Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import DynamicInputs from '@/components/dymamicInputs';

const MethodAbc = () => {
  const [unidadesProducidas, setUnidadesProducidas] = useState(0);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>({});
  const [costs, setCosts] = useState([{ activity: "", variableCost: "" }]);
  const [fixedOne, setfixedOne] =  useState(0);
  const [fixedTwo, setfixedTwo] =  useState(0);
  const handleOpen = () => setOpen(!open);


  const handleInputChange = (event: any) => {
    setUnidadesProducidas(parseInt(event.target.value));
  };

  const calcularCostos = () => {
    const costosTotales = new Array();
    costs.forEach((item: any) => {
      const costoVariablePorUnidad = item.variableCost / unidadesProducidas;
      const costoTotal = parseFloat(fixedOne) +parseFloat(fixedTwo) + (costoVariablePorUnidad * unidadesProducidas);
      costosTotales.push({ actividad: item.activity, costoTotal })
    })

    let costoTotalPorUnidad = 0;
    costosTotales.forEach((item: any) => {
      costoTotalPorUnidad += parseFloat(item.costoTotal);
    })

    const costosUnitarios = new Array();

    costosTotales.forEach(({ actividad, costoTotal }) => {
      const costoUnitario = parseFloat(costoTotal) / parseFloat(unidadesProducidas);
      costosUnitarios.push({ actividad, costoUnitario });
    })

    setData({ costosTotales, costosUnitarios, costoTotalPorUnidad });
    setOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 text-black">
      <Navigation />
      <div className="container flex flex-col justify-center pt-10">
        <span className="text-center font-bold text-2xl w-full">Modelo ABC</span>
        <p className="text-justify text-lg pt-5">
          El modelo de costeo ABC se basa en la idea de que los costos indirectos se asignan a las
          actividades que los generan, en lugar de distribuirlos de manera uniforme en todo el proceso. Esto
          permite una mejor comprensión de cómo se distribuyen los costos en diferentes actividades y puede
          ayudar a las empresas a identificar áreas donde se pueden reducir costos y mejorar la eficiencia.
        </p>
        <div className='flex flex-col justify-center gap-4 pt-10'>
          <DynamicInputs users={costs} setUsers={setCosts} />
          <div className='w-1/2'>
            <Input
              type="number"
              color="purple"
              label='costo fijo 1'
              value={fixedOne}
              onChange={(e:any) => setfixedOne(e?.target?.value)}
            />
          </div>
          <div className='w-1/2'>
            <Input
              type="number"
              color="purple"
              label='costo fijo 2'
              value={fixedTwo}
              onChange={(e:any) => setfixedTwo(e?.target?.value)}
            />
          </div>
          <div className='w-1/2'>
            <Input
              type="number"
              color="purple"
              label='Unidades producidas'
              value={unidadesProducidas}
              onChange={handleInputChange}
            />
          </div>
          <Button onClick={calcularCostos} color="purple" disabled={!unidadesProducidas}>Calcular</Button>
        </div>
      </div>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Resultados</DialogHeader>
        <DialogBody divider id='modalBody' className='flex flex-col'>
          <span className='font-bold text-lg'>Costos totales por actividad:</span>
          <div className='flex flex-col gap-3'>
            {
              data?.costosTotales?.map((item: any, index: number) => (
                <span key={`item-${index + 1}`}>{`${item.actividad}: ${item.costoTotal}`}</span>
              ))
            }
          </div>
          <span className='font-bold text-lg py-2'>{`Costo total por unidad producida: ${data?.costoTotalPorUnidad}`}</span>
          <span className='font-bold text-lg py-2'>Costos unitarios por actividad:</span>
          <div className='flex flex-col gap-3'>
            {
              data?.costosUnitarios?.map((item: any, index: number) => (
                <span key={`item-${index + 1}`}>{`${item.actividad}: ${item.costoUnitario}`}</span>
              ))
            }
          </div>
        </DialogBody>
        <DialogFooter className='gap-3 flex justify-center'>
          <Button variant="gradient" color="purple" onClick={() => {
            handleOpen();
          }}>
            <span>Cerrar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default MethodAbc;