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
        const { email, password, username } = Object.fromEntries(formData);

        loading = true;

        const { data, error } = await api.auth["sign-up"].post({
            email: email as string,
            password: password as string,
            name: username as string,
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
            <h1 class="font-bold text-xl">Sign Up</h1>
            <p class="text-primary/80">
                Enter your credentials to sign up for an account
            </p>
        </div>
        <div class="flex flex-col gap-y-6 mt-6">
            <div>
                <Label class="mb-2 font-semibold" for="email">Username</Label>
                <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                />
            </div>
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
            <div class="flex flex-col gap-y-4 mt-4">
                <Button disabled={loading} type="submit">Sign Up</Button>
                <Separator />
                <Button href={resolve("/sign-in")} variant="outline"
                    >Have an Account? Use Sign In Instead</Button
                >
            </div>
        </div>
    </form>
</section>
