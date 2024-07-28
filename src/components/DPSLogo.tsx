import dpsLogo from '../assets/DPS.svg';

export default function DPSLogo() {
  return (
    <div>
      <a href="https://www.digitalproductschool.io/" target="_blank">
        <img src={dpsLogo} className="logo" alt="DPS Logo" />
      </a>
    </div>
  );
}
