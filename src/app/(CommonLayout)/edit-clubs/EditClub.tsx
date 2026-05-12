"use client";

import { useForm, useFieldArray, SubmitHandler, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Save,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Tag,
  Info,
  CheckCircle2,
  Trophy,
  Activity,
  Layers,
  Sparkles,
  Upload,
  X
} from "lucide-react";
import ImageUpload from "@/components/form/ImageUpload";
import InputField from "@/components/form/InputField";
import TextareaField from "@/components/form/TextareaField";

interface Amenity {
  icon: string | File;
  service: string;
  description: string;
}

interface ClubFormValues {
  brand: {
    image: string | File;
    name: string;
    established: number;
    classification: string;
    tagline: string;
  };
  architects: {
    signature: string;
    image: string | File;
    title: string;
    description: { text: string }[];
    par_rating: number;
    slope_rating: number;
    bentgrass_type: string;
    total_yardage: number;
  };
  amenities: Amenity[];
  amenities_images: string | File;
}


const EditClub = () => {
  const existingClubInfo = {
    brand: {
      image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=2070&auto=format&fit=crop",
      name: "The Royal Ridges Estate",
      established: 1924,
      classification: "Signature Championship Course",
      tagline: "Excellence in every swing. Experience the pinnacle of sporting luxury on our award-winning championship terrain."
    },
    architects: {
      signature: "legacy & ternain",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop",
      title: "Architectural Precision Meets Natural Splendor.",
      description: [
        "Designed in 1924 and revitalized for the modern athlete, The Royal Ridges Estate seamlessly blends traditional course architecture with the rugged beauty of the valley's natural elevation changes.",
        "Our course is famous for the Gorge Run—a three-hole stretch"
      ],
      par_rating: 72,
      slope_rating: 145,
      bentgrass_type: "A-4",
      total_yardage: 7200,
    },
    amenities: [
      {
        icon: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=2070&auto=format&fit=crop",
        service: "18-Hole Pro Course",
        description: "Meticulously maintained bentgrass greens and white sand bunkers designed by legends."
      },
      {
        icon: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2070&auto=format&fit=crop",
        service: "Michelin Dining",
        description: "Farm-to-table excellence at The Ridges Grill."
      },
      {
        icon: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop",
        service: "Elite Wellness Spa",
        description: "Recovery and rejuvenation after your round."
      },
      {
        icon: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?q=80&w=2070&auto=format&fit=crop",
        service: "Pro-Shop Concierge",
        description: "Seamless equipment handling and caddy services."
      },
    ],
    amenities_images: "https://images.unsplash.com/photo-1595827432953-7161e19e303e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  const { register, control, handleSubmit, formState: { errors } } = useForm<ClubFormValues>({
    defaultValues: {
      ...existingClubInfo,
      architects: {
        ...existingClubInfo.architects,
        description: existingClubInfo.architects.description.map(d => ({ text: d }))
      }
    }
  });

  const { fields: descFields, append: appendDesc, remove: removeDesc } = useFieldArray({
    control,
    name: "architects.description"
  });

  const { fields: amenityFields, append: appendAmenity, remove: removeAmenity } = useFieldArray({
    control,
    name: "amenities"
  });

  const onSubmit: SubmitHandler<ClubFormValues> = (data) => {
    console.log("Updated Club Info:", data);
    alert("Club information updated! Check console for data including File objects.");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Edit Club Profile
            </h1>
            <p className="text-slate-500 mt-2 text-lg font-medium">Refine the essence of your elite golf destination.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">

          {/* Section 1: Brand Identity */}
          <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 text-slate-100 pointer-events-none">
              <Sparkles size={120} />
            </div>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
                <Tag size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Brand Identity</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <InputField title="Club Name" name="brand.name" register={register} error={errors.brand?.name} />
                <div className="grid grid-cols-2 gap-4">
                  <InputField title="Classification" name="brand.classification" register={register} error={errors.brand?.classification} />
                  <InputField title="Established" name="brand.established" register={register} error={errors.brand?.established} />
                </div>
                <TextareaField title="Club Tagline" name="brand.tagline" register={register} error={errors.brand?.tagline} />
              </div>

              <div>
                <Controller control={control} name="brand.image" render={({ field }) => (
                  <ImageUpload label="Brand Hero Image" value={field.value} onChange={field.onChange} aspectRatio="aspect-[4/3]" />
                )} />
              </div>
            </div>
          </section>

          {/* Section 2: Architecture & Specs */}
          <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-cyan-50 rounded-xl text-cyan-600">
                <Layers size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Course Architecture</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField title="Architecture Title" name="architects.title" register={register} error={errors.architects?.title} />
                  <InputField title="Signature Style" name="architects.signature" register={register} error={errors.architects?.signature} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-[11px] font-bold tracking-[0.1em] text-[#9CA3AF] uppercase">Narrative Descriptions</label>
                    <button
                      type="button"
                      onClick={() => appendDesc({ text: "" })}
                      className="text-xs flex items-center gap-1 text-cyan-600 hover:text-cyan-700 transition-colors bg-cyan-50 px-3 py-1.5 rounded-lg border border-cyan-100 font-bold"
                    >
                      <Plus size={14} /> Add Paragraph
                    </button>
                  </div>
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {descFields.map((field, index) => (
                        <motion.div
                          key={field.id}
                          layout
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="relative"
                        >
                          <textarea
                            {...register(`architects.description.${index}.text` as const)}
                            rows={3}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all resize-none text-slate-600"
                            placeholder="Describe a unique aspect of the course..."
                          />
                          <button
                            type="button"
                            onClick={() => removeDesc(index)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors p-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <Controller control={control} name="architects.image" render={({ field }) => (
                  <ImageUpload label="Feature Architecture Image" value={field.value} onChange={field.onChange} />
                )} />

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-700 mb-6 flex items-center gap-2">
                    <Activity size={16} /> Course Specs
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <InputField title="Par" name="architects.par_rating" register={register} error={errors.architects?.par_rating} />
                      <InputField title="Grass" name="architects.bentgrass_type" register={register} error={errors.architects?.bentgrass_type} />
                    </div>
                    <div className="space-y-4">
                      <InputField title="Slope" name="architects.slope_rating" register={register} error={errors.architects?.slope_rating} />
                      <InputField title="Yardage" name="architects.total_yardage" register={register} error={errors.architects?.total_yardage} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Amenities */}
          <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                  <CheckCircle2 size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Premier Amenities</h2>
              </div>
              <button
                type="button"
                onClick={() => appendAmenity({ icon: "", service: "", description: "" })}
                className="flex items-center gap-2 bg-purple-50 hover:bg-purple-100 text-purple-600 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border border-purple-100"
              >
                <Plus size={18} /> Add New Amenity
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {amenityFields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group bg-slate-50/50 border border-slate-200 p-6 rounded-3xl relative hover:border-purple-300 hover:bg-white transition-all shadow-sm hover:shadow-md"
                  >
                    <button
                      type="button"
                      onClick={() => removeAmenity(index)}
                      className="absolute -top-3 -right-3 bg-white hover:bg-red-500 text-slate-400 hover:text-white rounded-full p-2.5 transition-all shadow-sm border border-slate-200 hover:border-red-500 z-10"
                    >
                      <X size={16} />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div className="sm:col-span-1">
                        <Controller control={control} name={`amenities.${index}.icon` as const} render={({ field }) => (
                          <ImageUpload label="Icon/Image" value={field.value} onChange={field.onChange} aspectRatio="aspect-square" />
                        )} />
                      </div>
                      <div className="sm:col-span-2 space-y-4">
                        <div>
                          <label className="block text-[11px] font-bold tracking-[0.1em] text-[#9CA3AF] uppercase mb-2">Service Name</label>
                          <input
                            {...register(`amenities.${index}.service` as const)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-slate-600"
                            placeholder="e.g. Michelin Dining"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold tracking-[0.1em] text-[#9CA3AF] uppercase mb-2">Description</label>
                          <textarea
                            {...register(`amenities.${index}.description` as const)}
                            rows={3}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all text-slate-600"
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-12 pt-12 border-t border-slate-100">
              <Controller control={control} name="amenities_images" render={({ field }) => (
                <ImageUpload label="Amenities Section Background Banner" value={field.value} onChange={field.onChange} aspectRatio="aspect-[21/9]" />
              )} />
            </div>
          </section>

          {/* Form Footer Action */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-6 gap-6">
            <p className="text-slate-400 text-sm font-medium italic">
              * Finalize and publish your changes to the live club portal.
            </p>
            <button
              type="submit"
              className="group flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl">
              Publish Updates
              <CheckCircle2 size={24} className="group-hover:animate-bounce" />
            </button>
          </div>

        </form>
      </motion.div>
    </div>
  );
};

export default EditClub;