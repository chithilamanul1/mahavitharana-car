'use client';

import { useState, useEffect, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import {
    Vehicle,
    getVehicles,
    saveVehicle,
    deleteVehicle,
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
    mileage: '0 km (Brand New)',
    fuel: 'Petrol',
    transmission: 'Automatic',
    color: '',
    description: '',
});

export default function VehiclesPage() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [search, setSearch] = useState('');
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
        return matchSearch;
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
        if (!form.name || !form.make || !form.model) return;
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
        <div className="min-h-screen bg-[#f8f9fa]">
            {/* Header */}
            <div className="bg-white py-16 text-center border-b border-gray-200">
                <div className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-2">
                    TRUSTED CAR DEALER SERVICE
                </div>
                <h1 className="text-4xl font-bold text-black mb-4">
                    Explore All Vehicles
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto px-4">
                    All vehicles are brand new. Prices are inclusive of all charges.
                </p>

                {/* Admin toggle */}
                <div className="mt-6">
                    {isAdmin ? (
                        <div className="flex justify-center gap-3">
                            <button
                                className="btn-primary text-sm py-2 px-5"
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
                            className="text-gray-400 hover:text-black text-xs underline underline-offset-4 transition-colors"
                            onClick={() => setAdminOpen(true)}
                        >
                            Admin Login
                        </button>
                    )}
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
                <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <input
                        type="text"
                        placeholder="🔍 Search by make, model, name…"
                        className="input-field flex-1"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-20">
                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-gray-500 bg-white rounded-xl border border-gray-200">
                        <div className="text-6xl mb-4">🚗</div>
                        <p className="text-lg font-semibold">No vehicles found. Check back soon!</p>
                        {isAdmin && (
                            <button className="btn-primary mt-6" onClick={() => setAddOpen(true)}>
                                + Add First Vehicle
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filtered.map((v) => (
                            <div key={v.id} className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow group">
                                {/* Image */}
                                <div
                                    className="relative h-56 bg-gray-100 cursor-pointer"
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
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">Featured</span>
                                        {v.images.length > 0 && (
                                            <span className="bg-black/50 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                                                📷 {v.images.length}
                                            </span>
                                        )}
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">{v.year}</span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="p-6">
                                    <div className="text-xs text-gray-500 mb-1 font-semibold">{v.make} {v.model}</div>
                                    <h3 className="text-lg font-bold text-black mb-2 line-clamp-1">{v.name}</h3>
                                    <div className="text-sm font-bold text-gray-500 mb-6">Inquire for Price</div>

                                    <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-100 py-4 mb-4">
                                        <div className="flex flex-col items-center text-center">
                                            <span className="text-gray-400 text-sm mb-1">⛽</span>
                                            <span className="text-xs text-gray-500">Fuel type</span>
                                            <span className="text-sm font-semibold text-black">{v.fuel || 'N/A'}</span>
                                        </div>
                                        <div className="flex flex-col items-center text-center border-l border-r border-gray-100">
                                            <span className="text-gray-400 text-sm mb-1">⏱</span>
                                            <span className="text-xs text-gray-500">Mileage</span>
                                            <span className="text-sm font-semibold text-black">{v.mileage || '0 km'}</span>
                                        </div>
                                        <div className="flex flex-col items-center text-center">
                                            <span className="text-gray-400 text-sm mb-1">⚙️</span>
                                            <span className="text-xs text-gray-500">Transmission</span>
                                            <span className="text-sm font-semibold text-black">{v.transmission || 'N/A'}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <button
                                            className="text-sm font-bold text-black hover:underline flex items-center gap-1"
                                            onClick={() => { setSelected(v); setImgIdx(0); }}
                                        >
                                            VIEW DETAILS <span>→</span>
                                        </button>
                                        <div className="flex gap-2">
                                            {isAdmin && (
                                                <button
                                                    className="w-8 h-8 rounded-full border border-red-200 flex items-center justify-center text-red-500 hover:bg-red-50 hover:border-red-500 transition-colors"
                                                    onClick={() => setDelConfirm(v.id)}
                                                    title="Delete"
                                                >
                                                    🗑
                                                </button>
                                            )}
                                            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors">
                                                ⇄
                                            </button>
                                            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors">
                                                ♡
                                            </button>
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
                        className="relative w-full max-w-3xl mx-4 rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image Carousel */}
                        <div className="relative h-80 bg-gray-100">
                            {selected.images.length > 0 ? (
                                <>
                                    <Image
                                        src={selected.images[imgIdx]}
                                        alt={selected.name}
                                        fill
                                        className="object-contain"
                                    />
                                    {selected.images.length > 1 && (
                                        <>
                                            <button
                                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-black text-lg shadow-md hover:bg-white transition-colors flex items-center justify-center"
                                                onClick={() => setImgIdx((i) => (i - 1 + selected.images.length) % selected.images.length)}
                                            >
                                                ‹
                                            </button>
                                            <button
                                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-black text-lg shadow-md hover:bg-white transition-colors flex items-center justify-center"
                                                onClick={() => setImgIdx((i) => (i + 1) % selected.images.length)}
                                            >
                                                ›
                                            </button>
                                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 px-3 py-1.5 rounded-full">
                                                {selected.images.map((_, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setImgIdx(i)}
                                                        className="w-2 h-2 rounded-full transition-colors"
                                                        style={{ background: i === imgIdx ? '#fff' : 'rgba(255,255,255,0.5)' }}
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
                                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 text-black text-xl flex items-center justify-center hover:bg-white shadow-md transition-colors"
                            >
                                ×
                            </button>
                            <div className="absolute top-4 left-4">
                                <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded uppercase tracking-wider">Featured</span>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                                <div>
                                    <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">
                                        {selected.year} · {selected.make} {selected.model}
                                    </div>
                                    <h2 className="text-3xl text-black font-bold">
                                        {selected.name}
                                    </h2>
                                </div>
                                <div className="text-lg font-bold text-gray-500">
                                    Inquire for Price
                                </div>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                                {[
                                    { label: 'Fuel', val: selected.fuel, icon: '⛽' },
                                    { label: 'Transmission', val: selected.transmission, icon: '⚙️' },
                                    { label: 'Color', val: selected.color, icon: '🎨' },
                                    { label: 'Mileage', val: selected.mileage, icon: '⏱' },
                                ].map((d) => (
                                    <div
                                        key={d.label}
                                        className="rounded-xl p-4 text-center bg-gray-50 border border-gray-100"
                                    >
                                        <div className="text-xl mb-2">{d.icon}</div>
                                        <div className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">{d.label}</div>
                                        <div className="text-black text-sm font-bold mt-1">{d.val || '—'}</div>
                                    </div>
                                ))}
                            </div>

                            {selected.description && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-bold text-black mb-2">Description</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{selected.description}</p>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href={`https://wa.me/94779098813?text=Hi, I'm interested in the ${selected.name} (${selected.year}). Please let me know the price.`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-primary flex-1 text-center text-sm py-4 flex items-center justify-center gap-2"
                                >
                                    <span className="text-lg">💬</span> Enquire via WhatsApp
                                </a>
                                <a href="tel:+94779098813" className="btn-outline flex-1 text-center text-sm py-4 flex items-center justify-center gap-2">
                                    <span className="text-lg">📞</span> Call Now
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
                        className="w-full max-w-sm mx-4 rounded-2xl p-8 bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-black text-xl font-bold mb-6 text-center">
                            Admin Login
                        </h3>
                        <input
                            type="password"
                            placeholder="Enter admin password"
                            className="input-field mb-4"
                            value={pwInput}
                            onChange={(e) => { setPwInput(e.target.value); setPwError(false); }}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        />
                        {pwError && <p className="text-red-500 text-xs mb-4 font-semibold text-center">Incorrect password.</p>}
                        <div className="flex gap-3">
                            <button className="btn-primary flex-1" onClick={handleLogin}>Login</button>
                            <button className="btn-outline flex-1" onClick={() => setAdminOpen(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Add Vehicle Modal ── */}
            {addOpen && (
                <div className="modal-overlay">
                    <div
                        className="w-full max-w-2xl mx-4 rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto bg-white shadow-2xl"
                    >
                        <div className="p-8">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                                <h3 className="text-black text-2xl font-bold">
                                    Add New Vehicle
                                </h3>
                                <button onClick={() => setAddOpen(false)} className="text-gray-400 hover:text-black text-2xl font-bold">×</button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="sm:col-span-2">
                                    <label className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-2 block">Vehicle Name *</label>
                                    <input
                                        className="input-field"
                                        placeholder="e.g. Toyota Aqua 2024"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-2 block">Make *</label>
                                    <select
                                        className="input-field bg-white"
                                        value={form.make}
                                        onChange={(e) => setForm({ ...form, make: e.target.value })}
                                    >
                                        <option value="">Select Make</option>
                                        {MAKES.map((m) => <option key={m}>{m}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-2 block">Model *</label>
                                    <input
                                        className="input-field"
                                        placeholder="e.g. Aqua"
                                        value={form.model}
                                        onChange={(e) => setForm({ ...form, model: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-2 block">Year</label>
                                    <input
                                        type="number"
                                        className="input-field"
                                        value={form.year}
                                        min={2000}
                                        max={2030}
                                        onChange={(e) => setForm({ ...form, year: Number(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-2 block">Fuel Type</label>
                                    <select
                                        className="input-field bg-white"
                                        value={form.fuel}
                                        onChange={(e) => setForm({ ...form, fuel: e.target.value })}
                                    >
                                        {FUELS.map((f) => <option key={f}>{f}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-2 block">Transmission</label>
                                    <select
                                        className="input-field bg-white"
                                        value={form.transmission}
                                        onChange={(e) => setForm({ ...form, transmission: e.target.value })}
                                    >
                                        {TRANSMISSIONS.map((t) => <option key={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-2 block">Color</label>
                                    <input
                                        className="input-field"
                                        placeholder="e.g. Pearl White"
                                        value={form.color}
                                        onChange={(e) => setForm({ ...form, color: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-2 block">Mileage</label>
                                    <input
                                        className="input-field"
                                        placeholder="0 km (Brand New)"
                                        value={form.mileage}
                                        onChange={(e) => setForm({ ...form, mileage: e.target.value })}
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-2 block">Description</label>
                                    <textarea
                                        className="input-field resize-none h-32"
                                        placeholder="Describe the vehicle features, condition, etc…"
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    />
                                </div>

                                {/* Image Upload */}
                                <div className="sm:col-span-2">
                                    <label className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-2 block">
                                        Images (max 6)
                                    </label>
                                    <div
                                        className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-xl p-8 text-center cursor-pointer hover:border-black hover:bg-gray-100 transition-all"
                                        onClick={() => fileRef.current?.click()}
                                    >
                                        <div className="text-4xl mb-3">📷</div>
                                        <p className="text-black font-bold text-sm">Click to upload vehicle images</p>
                                        <p className="text-gray-500 text-xs mt-2">JPG, PNG, WebP – up to 6 images</p>
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
                                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mt-4">
                                            {images.map((img, i) => (
                                                <div key={i} className="relative h-20 rounded-lg overflow-hidden group shadow-sm border border-gray-200">
                                                    <Image src={img} alt={`Preview ${i + 1}`} fill className="object-cover" />
                                                    <button
                                                        onClick={() => setImages((imgs) => imgs.filter((_, j) => j !== i))}
                                                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-md hover:bg-red-600"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
                                <button className="btn-primary flex-1 py-3" onClick={handleAdd}>
                                    Add Vehicle
                                </button>
                                <button
                                    className="btn-outline flex-1 py-3"
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
                        className="w-full max-w-sm mx-4 rounded-2xl p-8 text-center bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-5xl mb-4">🗑️</div>
                        <h3 className="text-black text-xl font-bold mb-2">Delete Vehicle?</h3>
                        <p className="text-gray-600 text-sm mb-8">This action cannot be undone.</p>
                        <div className="flex gap-3">
                            <button className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-colors" onClick={() => handleDelete(delConfirm)}>
                                Yes, Delete
                            </button>
                            <button className="btn-outline flex-1 text-sm py-3" onClick={() => setDelConfirm(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
