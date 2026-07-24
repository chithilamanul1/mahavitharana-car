'use client';

import { useState, useEffect, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import {
    Vehicle,
    getVehicles,
    saveVehicle,
    deleteVehicle,
    formatPrice,
    ADMIN_PASSWORD,
} from '@/lib/vehicles';

const MAKES = ['Toyota', 'Honda', 'Nissan', 'Suzuki', 'Mitsubishi', 'Hyundai', 'Kia', 'Mazda', 'BMW', 'Mercedes-Benz', 'Audi', 'Other'];
const FUELS = ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'LPG'];
const TRANSMISSIONS = ['Automatic', 'Manual'];

const emptyForm = (): Omit<Vehicle, 'id' | 'createdAt' | 'images'> => ({
    name: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    mileage: '0 km (Brand New)',
    fuel: 'Petrol',
    transmission: 'Automatic',
    color: '',
    description: '',
});

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [search, setSearch] = useState('');
    const [maxPrice, setMaxPrice] = useState(100_000_000);
    const [selected, setSelected] = useState<Vehicle | null>(null);
    const [imgIdx, setImgIdx] = useState(0);

    // Admin
    const [adminOpen, setAdminOpen] = useState(false);
    const [pwInput, setPwInput] = useState('');
    const [pwError, setPwError] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // Add form
    const [addOpen, setAddOpen] = useState(false);
    const [form, setForm] = useState(emptyForm());
    const [images, setImages] = useState<string[]>([]);
    const [delConfirm, setDelConfirm] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setVehicles(getVehicles());
    }, []);

    const reload = () => setVehicles(getVehicles());

    const filtered = vehicles.filter((v) => {
        const q = search.toLowerCase();
        const matchSearch =
            !q ||
            v.name.toLowerCase().includes(q) ||
            v.make.toLowerCase().includes(q) ||
            v.model.toLowerCase().includes(q) ||
            String(v.year).includes(q);
        const matchPrice = v.price <= maxPrice;
        return matchSearch && matchPrice;
    });

    /* --- Admin login --- */
    function handleLogin() {
        if (pwInput === ADMIN_PASSWORD) {
            setIsAdmin(true);
            setAdminOpen(false);
            setPwInput('');
            setPwError(false);
        } else {
            setPwError(true);
        }
    }

    /* --- Image upload --- */
    async function handleImages(e: ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files || []);
        const readers = files.map(
            (f) =>
                new Promise<string>((res) => {
                    const r = new FileReader();
                    r.onload = () => res(r.result as string);
                    r.readAsDataURL(f);
                })
        );
        const b64 = await Promise.all(readers);
        setImages((prev) => [...prev, ...b64].slice(0, 6));
    }

    /* --- Add vehicle --- */
    function handleAdd() {
        if (!form.name || !form.make || !form.model || !form.price) return;
        const v: Vehicle = {
            ...form,
            id: Date.now().toString(),
            createdAt: Date.now(),
            images,
        };
        saveVehicle(v);
        reload();
        setAddOpen(false);
        setForm(emptyForm());
        setImages([]);
    }

    /* --- Delete vehicle --- */
    function handleDelete(id: string) {
        deleteVehicle(id);
        reload();
        setDelConfirm(null);
        if (selected?.id === id) setSelected(null);
    }

    return (
        <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
            {/* Header */}
            <div
                className="py-16 text-center"
                style={{ background: 'linear-gradient(180deg, #111 0%, #0a0a0a 100%)' }}
            >
                <h1 className="section-title mb-3">
                    Our <span className="gold">Vehicle</span> Inventory
                </h1>
                <div className="gold-divider" />
                <p className="section-subtitle text-gray-400 mx-auto px-4">
                    All vehicles are brand new. Prices are inclusive of all charges.
                </p>

                {/* Admin toggle */}
                <div className="mt-6">
                    {isAdmin ? (
                        <div className="flex justify-center gap-3">
                            <button
                                className="btn-gold text-sm py-2 px-5"
                                onClick={() => setAddOpen(true)}
                            >
                                + Add Vehicle
                            </button>
                            <button
                                className="btn-outline text-sm py-2 px-5"
                                onClick={() => setIsAdmin(false)}
                            >
                                Exit Admin
                            </button>
                        </div>
                    ) : (
                        <button
                            className="text-gray-600 hover:text-gray-400 text-xs underline underline-offset-4 transition-colors"
                            onClick={() => setAdminOpen(true)}
                        >
                            Admin Login
                        </button>
                    )}
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-8">
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="🔍 Search by make, model, name…"
                        className="input-dark flex-1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="flex items-center gap-3 min-w-[200px]">
                        <label className="text-gray-500 text-sm whitespace-nowrap">Max Price:</label>
                        <input
                            type="range"
                            min={500000}
                            max={100_000_000}
                            step={500000}
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="flex-1 accent-[#c9a84c]"
                        />
                        <span className="text-[#c9a84c] text-sm whitespace-nowrap">
                            {formatPrice(maxPrice)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-20">
                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-gray-600">
                        <div className="text-6xl mb-4">🚗</div>
                        <p className="text-lg">No vehicles found. Check back soon!</p>
                        {isAdmin && (
                            <button className="btn-gold mt-6" onClick={() => setAddOpen(true)}>
                                + Add First Vehicle
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((v) => (
                            <div key={v.id} className="glass-card overflow-hidden group">
                                {/* Image */}
                                <div
                                    className="relative h-52 bg-[#111] cursor-pointer"
                                    onClick={() => { setSelected(v); setImgIdx(0); }}
                                >
                                    {v.images.length > 0 ? (
                                        <Image
                                            src={v.images[0]}
                                            alt={v.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <span className="text-6xl opacity-20">🚗</span>
                                        </div>
                                    )}
                                    <div className="absolute top-3 left-3">
                                        <span className="badge-new">Brand New</span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-5">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3
                                                className="text-white font-semibold text-base leading-tight"
                                                style={{ fontFamily: 'Playfair Display, serif' }}
                                            >
                                                {v.name}
                                            </h3>
                                            <p className="text-gray-500 text-xs mt-0.5">
                                                {v.year} · {v.make} {v.model}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 my-3">
                                        {[v.fuel, v.transmission, v.color].filter(Boolean).map((t) => (
                                            <span
                                                key={t}
                                                className="text-[10px] text-gray-400 px-2 py-0.5 rounded-full"
                                                style={{ background: '#1e1e1e', border: '1px solid #333' }}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <span
                                            className="text-xl font-bold"
                                            style={{ color: '#c9a84c', fontFamily: 'Playfair Display, serif' }}
                                        >
                                            {formatPrice(v.price)}
                                        </span>
                                        <div className="flex gap-2">
                                            <button
                                                className="btn-gold text-xs py-1.5 px-4"
                                                onClick={() => { setSelected(v); setImgIdx(0); }}
                                            >
                                                Details
                                            </button>
                                            {isAdmin && (
                                                <button
                                                    className="text-xs py-1.5 px-3 rounded text-red-400 border border-red-900 hover:bg-red-900/30 transition-colors"
                                                    onClick={() => setDelConfirm(v.id)}
                                                >
                                                    Delete
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Vehicle Detail Modal ── */}
            {selected && (
                <div className="modal-overlay" onClick={() => setSelected(null)}>
                    <div
                        className="relative w-full max-w-3xl mx-4 rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        style={{ background: '#141414', border: '1px solid #2a2a2a' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image Carousel */}
                        <div className="relative h-72 bg-[#0d0d0d]">
                            {selected.images.length > 0 ? (
                                <>
                                    <Image
                                        src={selected.images[imgIdx]}
                                        alt={selected.name}
                                        fill
                                        className="object-cover"
                                    />
                                    {selected.images.length > 1 && (
                                        <>
                                            <button
                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white text-sm"
                                                onClick={() => setImgIdx((i) => (i - 1 + selected.images.length) % selected.images.length)}
                                            >
                                                ‹
                                            </button>
                                            <button
                                                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white text-sm"
                                                onClick={() => setImgIdx((i) => (i + 1) % selected.images.length)}
                                            >
                                                ›
                                            </button>
                                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                                {selected.images.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setImgIdx(i)}
                                                        className="w-2 h-2 rounded-full transition-colors"
                                                        style={{ background: i === imgIdx ? '#c9a84c' : '#555' }}
                                                    />
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <span className="text-7xl opacity-10">🚗</span>
                                </div>
                            )}
                            <button
                                onClick={() => setSelected(null)}
                                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white text-lg flex items-center justify-center hover:bg-black/80"
                            >
                                ×
                            </button>
                            <div className="absolute top-3 left-3">
                                <span className="badge-new">Brand New</span>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className="text-2xl text-white font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                                        {selected.name}
                                    </h2>
                                    <p className="text-gray-500 text-sm mt-0.5">
                                        {selected.year} · {selected.make} {selected.model}
                                    </p>
                                </div>
                                <div className="text-2xl font-bold" style={{ color: '#c9a84c', fontFamily: 'Playfair Display, serif' }}>
                                    {formatPrice(selected.price)}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                                {[
                                    { label: 'Fuel', val: selected.fuel },
                                    { label: 'Transmission', val: selected.transmission },
                                    { label: 'Color', val: selected.color },
                                    { label: 'Mileage', val: selected.mileage },
                                ].map((d) => (
                                    <div
                                        key={d.label}
                                        className="rounded-lg p-3 text-center"
                                        style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}
                                    >
                                        <div className="text-gray-500 text-[10px] uppercase tracking-widest">{d.label}</div>
                                        <div className="text-white text-sm font-medium mt-1">{d.val || '—'}</div>
                                    </div>
                                ))}
                            </div>

                            {selected.description && (
                                <p className="text-gray-400 text-sm leading-relaxed mb-5">{selected.description}</p>
                            )}

                            <div className="flex gap-3">
                                <a
                                    href={`https://wa.me/94779098813?text=Hi, I'm interested in the ${selected.name} (${selected.year}) listed at ${formatPrice(selected.price)}.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-gold flex-1 text-center text-sm"
                                >
                                    💬 Enquire via WhatsApp
                                </a>
                                <a href="tel:+94779098813" className="btn-outline flex-1 text-center text-sm">
                                    📞 Call Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Admin Login Modal ── */}
            {adminOpen && (
                <div className="modal-overlay" onClick={() => setAdminOpen(false)}>
                    <div
                        className="w-full max-w-sm mx-4 rounded-2xl p-8"
                        style={{ background: '#141414', border: '1px solid #2a2a2a' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-white text-xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                            Admin Login
                        </h3>
                        <input
                            type="password"
                            placeholder="Enter admin password"
                            className="input-dark mb-3"
                            value={pwInput}
                            onChange={(e) => { setPwInput(e.target.value); setPwError(false); }}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        />
                        {pwError && <p className="text-red-400 text-xs mb-3">Incorrect password.</p>}
                        <div className="flex gap-3">
                            <button className="btn-gold flex-1" onClick={handleLogin}>Login</button>
                            <button className="btn-outline flex-1" onClick={() => setAdminOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Add Vehicle Modal ── */}
            {addOpen && (
                <div className="modal-overlay">
                    <div
                        className="w-full max-w-2xl mx-4 rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        style={{ background: '#141414', border: '1px solid #2a2a2a' }}
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-white text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    Add New Vehicle
                                </h3>
                                <button onClick={() => setAddOpen(false)} className="text-gray-500 hover:text-white text-xl">×</button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="sm:col-span-2">
                                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-1 block">Vehicle Name *</label>
                                    <input
                                        className="input-dark"
                                        placeholder="e.g. Toyota Aqua 2024"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-1 block">Make *</label>
                                    <select
                                        className="input-dark"
                                        value={form.make}
                                        onChange={(e) => setForm({ ...form, make: e.target.value })}
                                        style={{ background: '#1a1a1a' }}
                                    >
                                        <option value="">Select Make</option>
                                        {MAKES.map((m) => <option key={m}>{m}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-1 block">Model *</label>
                                    <input
                                        className="input-dark"
                                        placeholder="e.g. Aqua"
                                        value={form.model}
                                        onChange={(e) => setForm({ ...form, model: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-1 block">Year</label>
                                    <input
                                        type="number"
                                        className="input-dark"
                                        value={form.year}
                                        min={2000}
                                        max={2030}
                                        onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-1 block">Price (LKR) *</label>
                                    <input
                                        type="number"
                                        className="input-dark"
                                        placeholder="e.g. 6500000"
                                        value={form.price || ''}
                                        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-1 block">Fuel Type</label>
                                    <select
                                        className="input-dark"
                                        value={form.fuel}
                                        onChange={(e) => setForm({ ...form, fuel: e.target.value })}
                                        style={{ background: '#1a1a1a' }}
                                    >
                                        {FUELS.map((f) => <option key={f}>{f}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-1 block">Transmission</label>
                                    <select
                                        className="input-dark"
                                        value={form.transmission}
                                        onChange={(e) => setForm({ ...form, transmission: e.target.value })}
                                        style={{ background: '#1a1a1a' }}
                                    >
                                        {TRANSMISSIONS.map((t) => <option key={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-1 block">Color</label>
                                    <input
                                        className="input-dark"
                                        placeholder="e.g. Pearl White"
                                        value={form.color}
                                        onChange={(e) => setForm({ ...form, color: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-1 block">Mileage</label>
                                    <input
                                        className="input-dark"
                                        placeholder="0 km (Brand New)"
                                        value={form.mileage}
                                        onChange={(e) => setForm({ ...form, mileage: e.target.value })}
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-1 block">Description</label>
                                    <textarea
                                        className="input-dark resize-none h-24"
                                        placeholder="Describe the vehicle features, condition, etc…"
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    />
                                </div>

                                {/* Image Upload */}
                                <div className="sm:col-span-2">
                                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">
                                        Images (max 6)
                                    </label>
                                    <div
                                        className="border-2 border-dashed border-[#333] rounded-xl p-6 text-center cursor-pointer hover:border-[#c9a84c] transition-colors"
                                        onClick={() => fileRef.current?.click()}
                                    >
                                        <div className="text-3xl mb-2">📷</div>
                                        <p className="text-gray-500 text-sm">Click to upload vehicle images</p>
                                        <p className="text-gray-600 text-xs mt-1">JPG, PNG, WebP – up to 6 images</p>
                                    </div>
                                    <input
                                        ref={fileRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                        onChange={handleImages}
                                    />
                                    {images.length > 0 && (
                                        <div className="grid grid-cols-3 gap-2 mt-3">
                                            {images.map((img, i) => (
                                                <div key={i} className="relative h-20 rounded-lg overflow-hidden group">
                                                    <Image src={img} alt={`Preview ${i + 1}`} fill className="object-cover" />
                                                    <button
                                                        onClick={() => setImages((imgs) => imgs.filter((_, j) => j !== i))}
                                                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button className="btn-gold flex-1" onClick={handleAdd}>
                                    Add Vehicle
                                </button>
                                <button
                                    className="btn-outline flex-1"
                                    onClick={() => { setAddOpen(false); setForm(emptyForm()); setImages([]); }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Delete Confirm ── */}
            {delConfirm && (
                <div className="modal-overlay" onClick={() => setDelConfirm(null)}>
                    <div
                        className="w-full max-w-sm mx-4 rounded-2xl p-8 text-center"
                        style={{ background: '#141414', border: '1px solid #3a1a1a' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-4xl mb-4">🗑️</div>
                        <h3 className="text-white text-lg font-bold mb-2">Delete Vehicle?</h3>
                        <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button className="flex-1 py-2 rounded-lg bg-red-700 hover:bg-red-600 text-white text-sm font-semibold transition-colors" onClick={() => handleDelete(delConfirm)}>
                                Yes, Delete
                            </button>
                            <button className="btn-outline flex-1 text-sm" onClick={() => setDelConfirm(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
