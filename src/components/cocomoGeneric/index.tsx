import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from "@material-tailwind/react";
import { useState } from "react";

const CocomoGeneric = () => {
  const [open, setOpen] = useState(false);
  const [linesOfCode, setLinesOfCode] = useState(0);
  const [effort, setEffort] = useState(0);
  const [duration, setDuration] = useState(0);
  const [cost, setCost] = useState(0);
  const handleOpen = () => setOpen(!open);

  const calculateCost = () => {
    setOpen(true);
    const exponent = 0.91 + 0.01 * effort;
    const calculatedEffort = 2.94 * Math.pow(linesOfCode, exponent);
    const calculatedDuration = 3.67 * Math.pow(calculatedEffort, 0.28);
    const calculatedCost = calculatedEffort * cost;

    setEffort(calculatedEffort.toFixed(2) as any);
    setDuration(calculatedDuration.toFixed(2) as any);
    setCost(calculatedCost.toFixed(2) as any);
  };

  return (

    <div className="flex flex-col justify-center container gap-5 pt-10">
      <Input
        type="number"
        label="Lineas de codigo:"
        value={linesOfCode}
        onChange={(e) => setLinesOfCode(parseInt(e.target.value))}
      />
      <Input
        label="Costo por Persona-Mes:"
        type="number"
        value={cost}
        onChange={(e) => setCost(parseFloat(e.target.value))}
      />
      <Button color="orange" onClick={calculateCost}>Calcular</Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Resultados</DialogHeader>
        <DialogBody divider id='modalBody' className='flex flex-col'>
          <span className='font-bold text-lg py-2'>{`Esfuerzo: ${effort}`}</span>
          <span className='font-bold text-lg py-2'>{`Duración: ${duration} meses`}</span>
          <span className='font-bold text-lg py-2'>{`Costo: $ ${cost}`}</span>
        </DialogBody>
        <DialogFooter className='gap-3 flex justify-center'>
          <Button variant="gradient" color="orange" onClick={() => {
            handleOpen();
            setEffort(0);
            setDuration(0);
            setCost(0);
          }}>
            <span>Cerrar</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export default CocomoGeneric;
