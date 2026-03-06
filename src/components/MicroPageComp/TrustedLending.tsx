"use client";
interface BusinessTrustedLendingProp {
  title?: string;
}

function TrustedLending({ title }: BusinessTrustedLendingProp) {
  return (
    <div className="bg-gradient-to-r from-secondary-600 to-primary-400">
      <div className="container mx-auto py-10 2xl:px-8 px-4">
        <p className="text-xl font-semibold text-white text-center">{title}</p>
      </div>
    </div>
  );
}

export default TrustedLending;
