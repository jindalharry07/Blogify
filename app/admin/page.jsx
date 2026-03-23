import React from 'react'
import Link from "next/link";

const Page = () => {
    const stats = [
        { label: 'Journal Posts', value: '12', description: 'Published stories' },
        { label: 'Subscribed Readers', value: '1.2k', description: 'Growth +12% this month' },
        { label: 'Total Readership', value: '45.8k', description: 'Engagement rate 6.4%' }
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="mb-12">
                <span className="cursive text-3xl text-gray-400 block mb-4">Good day, Administrator</span>
                <h2 className="serif text-5xl lg:text-7xl font-medium text-gray-900 tracking-tight leading-tight max-w-2xl">
                    Welcome back to your editorial dashboard.
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:shadow-gray-100 group">
                        <p className="text-[10px] tracking-[0.3em] uppercase font-bold text-gray-400 mb-6 group-hover:text-black transition-colors">{stat.label}</p>
                        <h3 className="serif text-5xl font-medium mb-4">{stat.value}</h3>
                        <p className="text-xs text-gray-400 font-medium font-montserrat">{stat.description}</p>
                    </div>
                ))}
            </div>

            <div className="bg-zinc-900 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="relative z-10 max-w-lg">
                    <h3 className="serif text-4xl lg:text-5xl font-medium mb-8 leading-tight italic">Your words shape the narrative.</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-10 font-montserrat uppercase tracking-[0.1em] font-bold">
                        Continue crafting stories that resonate with your audience and define the future of digital journalism.
                    </p>
                    <Link href={`/admin/addProduct`} className="px-10 py-4 bg-white text-black rounded-full text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-gray-100 transition-all active:scale-95">
                        Write New Story
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Page