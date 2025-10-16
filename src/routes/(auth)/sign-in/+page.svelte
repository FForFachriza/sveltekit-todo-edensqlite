<script lang="ts">
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";
    import { api } from "@/api/client";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { Separator } from "@/components/ui/separator";
    import { toast } from "svelte-sonner";

    let loading: boolean = $state(false);

    const handleSubmit = async (
        e: SubmitEvent & {
            currentTarget: EventTarget & HTMLFormElement;
        },
    ) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(formData);

        loading = true;

        const { data, error } = await api.auth["sign-in"].post({
            email: email as string,
            password: password as string,
        });

        if (error) {
            toast.error(error.value.message as string);
        } else {
            toast.success(data.message);
            await goto(resolve("/"));
        }

        loading = false;
    };
</script>

<section class="flex flex-row items-center justify-center min-h-screen">
    <form
        onsubmit={handleSubmit}
        action="/"
        method="POST"
        class="flex flex-col shadow-2xl px-6 py-8"
    >
        <div class="flex flex-col gap-y-2">
            <h1 class="font-bold text-xl">Sign In</h1>
            <p class="text-primary/80">
                Enter your email below to sign in to your account
            </p>
        </div>
        <div class="flex flex-col gap-y-6 mt-6">
            <div>
                <Label class="mb-2 font-semibold" for="email">Email</Label>
                <Input type="email" name="email" placeholder="Email" required />
            </div>
            <div>
                <Label class="mb-2 font-semibold" for="password">Password</Label
                >
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    required
                />
            </div>
        </div>
        <div class="flex flex-col gap-y-4 mt-4">
            <Button disabled={loading} type="submit">Sign In</Button>
            <Separator />
            <Button href={resolve("/sign-up")} variant="outline"
                >Don't Have an Account? Use Sign Up Instead</Button
            >
        </div>
    </form>
</section>
