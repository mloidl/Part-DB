{locale path="nextgen/locale" domain="partdb"}
<div class="panel panel-primary">
    <div class="panel-heading"><i class="fa fa-heartbeat fa-fw" aria-hidden="true"></i> {t}Sonstiges{/t}</div>
    <div class="panel-body">
        <form action="" method="post">

            <input type="hidden" name="show_no_orderdetails_parts" value="{if $show_no_orderdetails_parts}0{else}1{/if}">
            <button class="btn btn-default {if $show_no_orderdetails_parts}active{/if}" type="submit" name="change_show_no_orderdetails">{t}Teile ohne Einkaufsinformationen einblenden{/t}</button>
        </form>
    </div>
</div>

<form method="get">
    <input type="hidden" name="page" value="1">

    {include "../smarty_pagination.tpl"}
</form>

<div class="panel panel-default">
    <div class="panel-heading"><b>{$table_rowcount}</b> {t}Nicht mehr erhältliche Teile{/t}</div>
        {include file="../smarty_table.tpl" table_selectable=true}
</div>

<form method="get">
    <input type="hidden" name="page" value="1">

    {include "../smarty_pagination.tpl"}
</form>