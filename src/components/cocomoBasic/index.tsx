import React, { useState } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input } from "@material-tailwind/react";

function CocomoBasic() {
  const [open, setOpen] = useState(false);
  const [kloc, setKloc]: any = useState(0);
  const [resultado, setResultado]: any = useState(null);
  const handleOpen = () => setOpen(!open);

  const calcular = () => {
    const a = 2.4;
    const b = 1.05;
    const esfuerzo = a * Math.pow(kloc, b);
    const tiempo = 2.5 * Math.pow(esfuerzo, 0.38);
    const programadores = esfuerzo / tiempo;
    setOpen(true);
    setResultado({
      esfuerzo: esfuerzo.toFixed(2),
      tiempo: tiempo.toFixed(2),
      programadores: programadores.toFixed(2)
    });
  };

  return (
    <div className="flex flex-col justify-center container gap-5 pt-10">
      <Input
        label="Tamaño del proyecto en KLOC"
        type="number"
        color="orange"
        value={kloc}
        onChange={(e) => setKloc(parseFloat(e.target.value))}
      />
      <Button color="orange" onClick={calcular}>Calcular</Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Resultados</DialogHeader>
        <DialogBody divider id='modalBody' className='flex flex-col'>
          {resultado && (
            <div>
              <p>Esfuerzo en personas-mes: {resultado.esfuerzo}</p>
              <p>Tiempo de desarrollo en meses: {resultado.tiempo}</p>
              <p>Número de programadores requeridos: {resultado.programadores}</p>
            </div>
          )}
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
  );
}

export default CocomoBasic;
