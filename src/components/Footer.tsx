import { Link } from 'react-router-dom';

type BaseButton = {
  to?: string;
  onClick?: () => void;
  label: string;
};

type LeftButton = BaseButton & {
  icon?: boolean;
  className?: never;
  disabled?: never;
};

type RightButton = BaseButton & {
  icon?: never;
  className?: string;
  disabled?: boolean;
};

interface FooterProps {
  leftButton?: LeftButton;
  rightButton?: RightButton;
  total?: number;
}

export const Footer = ({ leftButton, rightButton, total }: FooterProps) => {
  const renderButton = (button: LeftButton | RightButton, isLeft: boolean) => {
    if (!button) return null;

    const className = button.className || 
      `${isLeft ? 'text-green-600' : 'bg-green-600 text-white'} px-6 py-2 rounded-lg 
       ${!isLeft && 'hover:bg-green-700'} flex items-center space-x-2`;

    const content = (
      <>
        {isLeft && (button as LeftButton).icon && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        )}
        <span>{button.label}</span>
      </>
    );

    if (button.to) {
      return (
        <Link to={button.to} className={className}>
          {content}
        </Link>
      );
    }

    return (
      <button 
        onClick={button.onClick} 
        className={className}
        disabled={(button as RightButton).disabled}
      >
        {content}
      </button>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {total !== undefined && (
          <div className="text-xl font-bold text-green-700">
            Total: R$ {total.toFixed(2)}
          </div>
        )}
        <div className={`flex items-center space-x-4 ${total === undefined ? 'ml-auto' : ''}`}>
          {renderButton(leftButton as LeftButton, true)}
          {renderButton(rightButton as RightButton, false)}
        </div>
      </div>
    </div>
  );
}; 