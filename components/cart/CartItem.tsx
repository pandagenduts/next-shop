export default function CartItem() {
  return (
    <div className='flex gap-4'>
      <div className='max-w-[90px]'>
        <a href='/'>
          <img src='/product-1.webp' alt='product-img' />
        </a>
      </div>
      <div className='flex-1 flex flex-col justify-between'>
        <a href='/'>Product Title</a>
        <div className='flex justify-between gap-4'>
          <div>Qty: 1</div>
          <div>Rp 123.000,-</div>
        </div>
      </div>
    </div>
  );
}
